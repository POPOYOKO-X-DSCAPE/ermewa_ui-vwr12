import { defineTokens } from "@pandacss/dev";
import { bg, fg } from "../../semantic/colors";
import { padding } from "../../semantic/spacings";

export const colors = defineTokens.colors({
	bg: bg.elevated.initial,
	fg: fg.elevated.initial,
});

// Split padding (block/inline) so projects can set asymmetric header bars;
// defaults keep the previous uniform padding.m.
export const spacing = defineTokens.spacing({
	paddingBlock: padding.m,
	paddingInline: padding.m,
});

export const header = defineTokens({
	colors,
	spacing,
});
