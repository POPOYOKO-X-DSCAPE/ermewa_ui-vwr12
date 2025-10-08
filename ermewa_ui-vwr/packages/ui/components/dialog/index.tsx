import * as Ariakit from "@ariakit/react";
import classNames from "classnames";
import type React from "react";
import { css } from "../../../../styled-system/css";

const dialog = css({
  position: "fixed",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  padding: "s.padding.l",
  borderRadius: "b.radius.m",
  backgroundColor: "s.bg.elevated.initial",
});

interface DialogProps {
  children: React.ReactNode;
  isOpen?: boolean;
  closeButtonContent: React.ReactNode;
  onClose: () => void;
}

export const Dialog = ({ children, isOpen = false, onClose }: DialogProps) => {
  return (
    <Ariakit.Dialog
      open={isOpen}
      onClose={() => onClose()}
      className={classNames(dialog)}
    >
      {children}
    </Ariakit.Dialog>
  );
};
