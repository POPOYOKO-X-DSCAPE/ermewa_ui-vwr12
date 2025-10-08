import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";

export const colors = defineSemanticTokens.colors({
	bg: {
		default: {
			initial: brand.colors.grey.scales.s09,
			hover: brand.colors.grey.scales.s00,
		},
		elevated: {
			initial: brand.colors.grey.scales.s10,
			hover: brand.colors.grey.scales.s09,
		},
		actionLow: {
			initial: brand.colors.grey.scales.s09,
			hover: brand.colors.grey.scales.s08,
		},
		actionHigh: {
			initial: brand.colors.primary.scales.s05,
			hover: brand.colors.primary.scales.s04,
		},
	},
	fg: {
		default: {
			initial: brand.colors.grey.scales.s00,
			hover: brand.colors.grey.scales.s01,
		},
		elevated: {
			initial: brand.colors.grey.scales.s00,
			hover: brand.colors.grey.scales.s01,
		},
		actionLow: {
			initial: brand.colors.primary.scales.s05,
			hover: brand.colors.primary.scales.s04,
		},
		actionHigh: {
			initial: brand.colors.grey.scales.s10,
			hover: brand.colors.grey.scales.s09,
		},
	},
});

export const { bg, fg } = colors;
