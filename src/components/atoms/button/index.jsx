import classNames from "classnames";
import style from "./index.module.css";

export const BUTTON_TYPES = {
  blue: "blue",
};

const Button = ({ text, onClick, type }) => {
  return (
    <button
      className={classNames(style.button, {
        [style.blue]: type === BUTTON_TYPES.blue,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
