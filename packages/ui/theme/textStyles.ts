import { defineTextStyles } from "@pandacss/dev";

// House action label: buttons render these through textStyle so each project's
// display font + tracking apply. Negspace actionL: 12px / 500 / uppercase /
// -0.02em (design-spec §3.2).
export const actionL = {
	fontFamily: "s.display",
	fontSize: "12px",
	fontWeight: "500",
	textTransform: "uppercase" as const,
	letterSpacing: "-0.02em",
};

export const textStyles = defineTextStyles({
	actionL: { value: actionL },
});
