import { defineTokens } from "@pandacss/dev";
import { bg, fg } from "../../semantic/colors";
import { radius } from "../../semantic/radii";
import { padding } from "../../semantic/spacings";

const spacing = defineTokens.spacing({
	padding: padding.m,
});

export const radii = defineTokens.radii({
	radius: radius.m,
});

const primaryColors = defineTokens.colors({
	bg: { initial: bg.actionHigh.initial, hover: bg.actionHigh.hover },
	fg: { initial: fg.actionHigh.initial, hover: fg.actionHigh.hover },
});

const secondaryColors = defineTokens.colors({
	bg: { initial: bg.actionLow.initial, hover: bg.actionLow.hover },
	fg: { initial: fg.actionLow.initial, hover: fg.actionLow.hover },
});

export const buttonPrimary = defineTokens({
	radii,
	spacing,
	colors: primaryColors,
});

export const buttonSecondary = defineTokens({
	radii,
	spacing,
	colors: secondaryColors,
});
