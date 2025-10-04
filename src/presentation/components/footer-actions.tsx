import { Button } from "@packages/ui/components/button";
import { Fragment } from "react";

interface Action {
  id: string;
  label: string;
  onClick: () => void;
  renderModal?: () => JSX.Element | null;
}

interface FooterActionsProps {
  actions: Action[];
}

export const FooterActions: React.FC<FooterActionsProps> = ({ actions }) => {
  return (
    <>
      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {actions.map(({ label, onClick, id }, i) => (
          <Button
            key={id}
            type="button"
            level={i > actions.map.length - 1 ? "primary" : "secondary"}
            onClick={onClick}
          >
            {label}
          </Button>
        ))}
      </footer>

      {actions.map(({ id, renderModal }) => {
        if (!renderModal) return null;
        return <Fragment key={`${id}-modal`}>{renderModal()}</Fragment>;
      })}
    </>
  );
};
