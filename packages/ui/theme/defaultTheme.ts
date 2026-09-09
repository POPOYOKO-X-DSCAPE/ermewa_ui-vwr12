import { defineTokens } from "@pandacss/dev";
import { app } from "./components/app/tokens";
import {
	buttonMenu,
	buttonMenuItem,
	buttonPrimary,
	buttonSecondary,
} from "./components/button/tokens";
import {
	documentViewer,
	documentViewerZoom,
} from "./components/documentViewer/tokens";
import {
	input,
	inputContainer,
	inputDisabled,
	inputError,
	inputFocus,
	inputLabel,
} from "./components/form/input/tokens";
import { header } from "./components/header/tokens";
import { buildComponentTokens } from "./flatten";
import { keyframes } from "./keyframes";
import { semantic } from "./semantic";
import { themeContract } from "./themeContract";

const components = {
	app,
	header,
	documentViewer,
	documentViewerZoom,
	buttonPrimary,
	buttonSecondary,
	buttonMenu,
	buttonMenuItem,
	inputContainer,
	inputLabel,
	input,
	inputError,
	inputFocus,
	inputDisabled,
};

export const componentsTokens = defineTokens(
	buildComponentTokens(components),
);

export const defaultTheme = themeContract({
	tokens: semantic,
	semanticTokens: { ...componentsTokens },
	keyframes,
});
