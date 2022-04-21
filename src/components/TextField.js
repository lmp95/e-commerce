import { Input } from "antd";
import React from "react";
const TextField = function ({
  placeholder,
  prefixIcon,
  isPassword,
  size,
  value,
  onChange,
}) {
  const onValueChange = (newValue) => {
    onChange?.(newValue);
  };

  return isPassword ? (
    <Input.Password
      placeholder={placeholder}
      prefix={prefixIcon && prefixIcon}
      value={value}
      onChange={onValueChange}
      size={size}
    />
  ) : (
    <Input
      placeholder={placeholder}
      prefix={prefixIcon && prefixIcon}
      value={value}
      onChange={onValueChange}
      size={size}
    />
  );
};

export default TextField;
