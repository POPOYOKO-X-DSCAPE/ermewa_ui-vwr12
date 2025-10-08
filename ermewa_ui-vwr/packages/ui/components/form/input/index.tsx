import { FormInput, FormLabel, type FormStore } from "@ariakit/react";
import classNames from "classnames";
import { css } from "../../../../../styled-system/css";
import { Stack } from "../../../abstract/stack";

const stack = css({
  gap: "c.inputContainer.gap",
});

const inputLabel = css({
  color: "c.inputLabel.color",
});

const input = css({
  padding: "c.input.padding",
  backgroundColor: "c.input.bg",
  borderColor: "#0001",
  borderWidth: "1px",
  borderRadius: "c.input.radius",
});

type InputProps<T extends FormStore> = {
  form: T;
  name: keyof T["names"];
  label: string;
  type?: "input" | "textarea";
};

export const Input = <T extends FormStore<FormStore["names"]>>({
  name,
  label,
  type = "input",
}: InputProps<T>) => {
  return (
    <Stack className={classNames(stack)}>
      <FormLabel name={name.toString()} className={classNames(inputLabel)}>
        {label} :
      </FormLabel>
      {type === "input" ? (
        <FormInput name={name.toString()} className={classNames(input)} />
      ) : (
        <FormInput
          name={name.toString()}
          className={classNames(input)}
          render={<textarea />}
        />
      )}
    </Stack>
  );
};
