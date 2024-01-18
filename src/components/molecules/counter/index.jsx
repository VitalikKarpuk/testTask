import Button, { BUTTON_TYPES } from "../../atoms/button";

import style from "./index.module.css";

const Counter = ({ text, onChange, value }) => {
  const increment = () => {
    onChange?.(value + 1);
  };

  const decrement = () => {
    !!value && onChange?.(value - 1);
  };

  return (
    <div className={style.counter}>
      <Button text="-" onClick={decrement} type={BUTTON_TYPES.blue} />
      <div className={style.value}>{value || 1}</div>
      <div className={style.hours}>{text}</div>
      <Button text="+" onClick={increment} type={BUTTON_TYPES.blue} />
    </div>
  );
};

export default Counter;
