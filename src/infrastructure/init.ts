import type { DocumentBodyResponse } from "../interface-adapters/external-types/document";
import type { AppProfileBodyResponse } from "../interface-adapters/external-types/app-profile";
import { adaptAppProfileResponse } from "../interface-adapters/gateways/app-profile/response-adapter";

import services from "./services";

const isDev = import.meta.env.DEV;

export const documentStatusMap = [
	{ label: "undefined", backgroundColor: "grey" },
	{ label: "pending", backgroundColor: "orange" },
	{ label: "accepted", backgroundColor: "green" },
	{ label: "rejected", backgroundColor: "red" },
	{ label: "removed", backgroundColor: "black" },
	{ label: "N/A", backgroundColor: "lavender" },
] as const;

type DocumentStatus =
	(typeof documentStatusMap)[keyof typeof documentStatusMap];

const init = async () => {
	try {
		if (isDev) await services.dummy.get.auth();

		const profileResponse = await services.vwr.get.parameters({});
		const profileJson: AppProfileBodyResponse =
			// @ts-ignore <typescript technical debt [services]>
			await profileResponse.data.json();
		const appProfile = adaptAppProfileResponse(profileJson);

		const url = window.location.href;
		const documentCode = url
			.substring(url.lastIndexOf("/") + 1)
			.split("?")[0];

		console.log("documentCode: ", documentCode);

		const documentResponse = await services.vwr.get.document({
			params: { documentCode },
		});
		const document: DocumentBodyResponse =
			// @ts-ignore <typescript technical debt [services]>
			(await documentResponse.data.json())[documentCode];

		console.log("document: ", document);

		function getStatus(index: number): DocumentStatus | undefined {
			if (index in documentStatusMap) {
				return documentStatusMap[
					index as keyof typeof documentStatusMap
				];
			}
			return undefined;
		}

		const documentStatus = document.STATE;
		const documentDate = document.DOCDATE;
		const documentExpires = document.DOCEXPIRE;

		const [documentType, fileStructure] = Object.entries(
			document.XFILE,
		)[0];
		const [lang, fileDescription] = Object.entries(
			fileStructure.LAN,
		)[0];

		const fileResponse = await services.vwr.post.file({
			params: { documentCode, extension: documentType.toUpperCase() },
			body: {
				// @ts-ignore <typescript technical debt [services]>
				XDOC: {
					[documentCode]: {
						STATE: 1,
						URL: document.URL,
						XFILE: {
							[documentType]: {
								LAN: {
									[lang]: {
										URLDET: fileDescription.URLDET,
									},
								},
							},
						},
					},
				},
			},
		});

		const blob: Blob =
			fileResponse.data instanceof Blob
				? fileResponse.data
				: // @ts-ignore <typescript technical debt [services]>
					await fileResponse.data.blob();

		return {
			appProfile,
			document: {
				blob,
				type: documentType.toLowerCase(),
				code: documentCode,
				status: documentStatus,
				date: documentDate,
				expires: documentExpires,
			},
			error: null,
		};
	} catch (error) {
		console.error(error);

		return {
			appProfile: null,
			document: null,
			error,
		};
	}
};

export default init;
