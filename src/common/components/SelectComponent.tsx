import { FormControl, InputLabel, MenuItem, Select, TextField, type TextFieldVariants } from "@mui/material";
import { Controller, type RegisterOptions } from "react-hook-form";

interface SelectComponentProps {
  label: string;
  placeholder?: string;
  control: any;
  name: string;
  rules?: RegisterOptions | null;
  labelId: string;
  options: any;
  optionValue: string | null;
  optionLabel: string;
  multiple: boolean;
}
function SelectComponent({
  name,
  control,
  rules,
  label,
  placeholder,
  labelId,
  options,
  optionValue,
  optionLabel,
  multiple
}: SelectComponentProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules ? rules : undefined}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select 
            {...field}
            labelId={labelId}
            label={label}
            multiple={multiple}
            value={field.value}
            onChange={(event) => {
              field.onChange(event.target.value);
            }}
            >
                {options.map(option => (
                  <MenuItem key={option} value={optionValue ? option[optionValue]: option}>
                    {option[optionLabel]}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  );
}
export default SelectComponent;
