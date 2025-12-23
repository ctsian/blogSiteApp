import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      placeholder="Search by title, tag or author"
      variant="standard"
      
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        disableUnderline: true,
        sx: {
          fontSize: "1rem",
          width: "290px",
          padding: "8px 0",
          borderBottom: "1px solid #E5E7EB"
        }
      }}
    />
  );
}
