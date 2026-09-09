import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import type { AppProfileInterface } from "../../domain/types/app-profile";
import init from "../../infrastructure/init";

type AppContextType = {
	loading: boolean;
	appProfile: AppProfileInterface | null;
	document: {
		url: string;
		type: string;
		code: string;
		status?: number;
		date: string;
		expires?: string;
	} | null;
	error: unknown;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: { children: ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const [appProfile, setAppProfile] =
		useState<AppContextType["appProfile"]>(null);
	const [document, setDocument] =
		useState<AppContextType["document"]>(null);
	const [error, setError] = useState<AppContextType["error"]>(null);

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			setLoading(true);

			if (import.meta.env.DEV) {
				if (!cancelled) {
					setAppProfile({
						$ClassName: "$ClassName:",
						$ClassVer: "$ClassVer",
						$uid: "0",
						$stamp: "$stamp",
						headers: {
							login: "ouser",
							uPid: "0",
							xEdm: "xEdm",
							xPrf: "xPrf",
						},
						app: {
							name: {},
							permissions: {
								canCopy: true,
								canDownload: true,
								canMail: true,
							},
							sid: "0",
							title: "VWR12",
							version: "0",
						},
						messages: {},
						profile: {
							name: {},
							parameters: {},
							pid: "",
							server: {},
							sid: "",
						},
						user: {
							name: "offline user",
							defaultLang: "ENG",
							email: "offline@example.mail",
							id: "0",
							lang: ["FRA", "ENG", "GER"],
							app: {},
						},
					});
					setDocument({
						// Replace url and type below to visualize another file in dev mode [pdf, msg, xml, json, jpeg, jpg, png, mp4, txt].
						url: "http://localhost:4000/example.pdf",
						type: "pdf",
						code: "DCXXXXXXX",
						date: "15/09/2025",
						status: 0,
						expires: "15/01/2026",
					});
					setError(null);
					setLoading(false);
				}
			} else {
				const {
					appProfile,
					document: serverDocument,
					error,
				} = await init();
				let url = "";
				if (serverDocument?.blob) {
					url = URL.createObjectURL(serverDocument.blob);
				}
				if (!cancelled) {
					setAppProfile(appProfile);
					setDocument(
						serverDocument
							? {
									url,
									type: serverDocument.type,
									code: serverDocument.code,
									date: serverDocument.date,
									status: serverDocument.status,
									expires: serverDocument.expires,
								}
							: null,
					);
					setError(error);
					setLoading(false);
				}
			}
		};

		void load();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<AppContext.Provider
			value={{ loading, appProfile, document, error }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context)
		throw new Error("useAppContext must be used within AppProvider");
	return context;
};
