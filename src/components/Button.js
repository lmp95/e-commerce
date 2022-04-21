import { Button as AntBtn } from "antd";

const Button = function ({
  style,
  type,
  icon,
  size,
  label,
  handleOnClick,
  isBtnDisabled,
}) {
  return (
    <AntBtn
      className={style}
      type={type}
      icon={icon}
      size={size}
      onClick={handleOnClick}
      disabled={isBtnDisabled}
    >
      {label}
    </AntBtn>
  );
};

export default Button;
