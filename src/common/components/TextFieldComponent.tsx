import { TextField, type TextFieldVariants } from "@mui/material";
import { Controller, type RegisterOptions } from "react-hook-form";

interface TextFieldComponentProps {
  label: string;
  placeholder?: string;
  control: any;
  name: string;
  rules?: RegisterOptions | null;
  variant: TextFieldVariants | undefined;
}
function TextFieldComponent({
  name,
  control,
  rules,
  label,
  placeholder,
  variant
}: TextFieldComponentProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules ? rules : undefined}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={label}
            variant={variant}
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </>
  );
}
export default TextFieldComponent;
