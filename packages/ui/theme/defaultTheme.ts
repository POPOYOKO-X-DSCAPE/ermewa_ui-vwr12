import { defineTokens } from "@pandacss/dev";
import { app } from "./components/app/tokens";
import {
	buttonGhost,
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
import { searchInput } from "./components/form/search-input/tokens";
import { header } from "./components/header/tokens";
import { buildComponentTokens } from "./flatten";
import { keyframes } from "./keyframes";
import { semantic } from "./semantic";
import { textStyles } from "./textStyles";
import { themeContract } from "./themeContract";

const components = {
	app,
	header,
	documentViewer,
	documentViewerZoom,
	buttonPrimary,
	buttonSecondary,
	buttonGhost,
	buttonMenu,
	buttonMenuItem,
	inputContainer,
	inputLabel,
	input,
	inputError,
	inputFocus,
	inputDisabled,
	searchInput,
};

export const componentsTokens = defineTokens(
	buildComponentTokens(components),
);

export const defaultTheme = themeContract({
	tokens: semantic,
	semanticTokens: { ...componentsTokens },
	keyframes,
	textStyles,
});
