import { defineTokens } from "@pandacss/dev";
import { bg, fg } from "../../semantic/colors";
import { padding } from "../../semantic/spacings";

export const sidebar = defineTokens({
	colors: {
		bg: { initial: bg.elevated.initial, hover: bg.elevated.hover },
		fg: { initial: fg.elevated.initial },
		element: {
			bg: {
				initial: bg.elevated.initial,
				hover: bg.elevated.hover,
			},
			fg: {
				initial: fg.elevated.initial,
				hover: fg.elevated.hover,
			},
		},
	},
	spacing: {
		element: {
			padding: { initial: padding.xs },
			paddingX: { intial: padding.m },
		},
		groupChildren: {
			paddingLeft: { initial: padding.xxl },
		},
	},
});
