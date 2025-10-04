import { useMemo } from "react";
import { useAppContext } from "./presentation/common/app-context";
import { useFooterActions } from "./presentation/logic/use-footer-actions";
import "./index.css";
import { Heading, HeadingLevel } from "@ariakit/react";
import { App as AbstractApp, Header } from "@packages/ui";
import { DocumentViewer } from "@packages/ui/components/document-viewer";
import { fetchAndProcessDocument } from "./infrastructure/helpers/fetch-and-process-document";
import services from "./infrastructure/services";

function App() {
	const {
		appProfile,
		loading: appLoading,
		document,
		error,
	} = useAppContext();

	const actions = useFooterActions(
		document?.url || null,
		document?.code || "",
	);

	const loading = useMemo(
		() => appLoading || !document,
		[appLoading, document],
	);

	const handlePdfPageCopy = async (pdfUrl: string) => {
		if (!pdfUrl) return;

		try {
			const body = await fetchAndProcessDocument(pdfUrl);
			// @ts-ignore <typescript technical debt [services]>
			await services.local.post.clipboard({ body });
			console.log(`::Clipboard: "${body.fileName}" copié avec succès.`);
		} catch (err) {
			console.error("::Clipboard Error:", err);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<AbstractApp>
			<HeadingLevel>
				<Header>
					<Heading>{appProfile?.app.title || ""}</Heading>
				</Header>
				{document?.url && (
					<DocumentViewer
						actions={actions.filter((action) => !action.hidden)}
						url={document.url}
						name={document.code}
						status={document.status}
						date={document.date}
						expires={document.expires}
						// @ts-ignore <typescript technical debt [document-viewer]>
						type={document?.type ?? "unknown"}
						error={error ? String(error) : null}
						loading={loading}
						className=""
						onPdfPageCopy={handlePdfPageCopy}
					/>
				)}
			</HeadingLevel>
		</AbstractApp>
	);
}

export default App;
