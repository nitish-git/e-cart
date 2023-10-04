import React from "react";

import Select from "react-select";

export const CustomDropdown = ({ options, placeholder, value, onChange }) => (
  <Select
    options={options}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="custom-dropdown"
    isClearable
    theme={(theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#d9c7ea",
        primary: "#4b286d",
      },
    })}
  />
);
