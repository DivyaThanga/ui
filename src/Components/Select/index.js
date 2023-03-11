import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

export default function ResponsiveSelect({
  options,
  selectValue,
  inputLables,
  setSelectValue,
}) {
  return (
    <>
      <FormControl style={{ minWidth: "235px" }} required>
        <InputLabel>{inputLables}</InputLabel>
        <Select
          value={selectValue}
          label="Select Class"
          name="class"
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {options.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
