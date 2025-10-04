// export { defaultTheme as theme } from "@packages/ui/theme/defaultTheme";

import { componentsTokens as originalsComponentsTokens } from "@packages/ui/theme/defaultTheme";
import { defineThemeContract } from "@pandacss/dev";
import { componentsTokens } from "./defaultTheme";
import { semantic } from "./semantic";

const themeContract = defineThemeContract({
	semanticTokens: originalsComponentsTokens,
});

export const theme = themeContract({
	tokens: semantic,
	semanticTokens: { ...componentsTokens },
});
