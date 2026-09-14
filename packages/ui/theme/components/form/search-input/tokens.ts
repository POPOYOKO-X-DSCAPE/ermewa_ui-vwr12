import { defineTokens } from "@pandacss/dev";
import { bg, fg } from "../../../semantic/colors";
import { radius } from "../../../semantic/radii";
import { padding } from "../../../semantic/spacings";

const spacing = defineTokens.spacing({
	padding: padding.xs,
	gap: padding.xxs,
});

const radii = defineTokens.radii({
	radius: radius.l,
});

const colors = defineTokens.colors({
	// A token, so projects may override with a composite (e.g. a gradient —
	// the kit field reads it through `background`, not `backgroundColor`).
	bg: bg.default.initial,
	fg: fg.default.initial,
	border: bg.actionLow.hover,
	borderFocus: fg.default.initial,
});

export const searchInput = defineTokens({
	radii,
	spacing,
	colors,
});
