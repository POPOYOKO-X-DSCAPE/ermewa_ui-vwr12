import { defineThemeContract } from "@pandacss/dev";
import { componentsTokens } from "./defaultTheme";

export const themeContract = defineThemeContract({
	semanticTokens: componentsTokens,
});
