import { useState } from "react";
import style from "./index.module.css";
import { createDateString } from "../../organisms/scheduleEditor/helper";

const TimeDateView = ({ onChange, endValue }) => {
  const now = new Date();
  const [startDate, setStartDate] = useState(createDateString(now));

  const handlStart = (e) => {
    setStartDate(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      {/* <div className={style.value}>{startValue}</div> */}
      <input value={startDate} onChange={handlStart} />
      <div className={style.middleText}>до</div>
      <div className={style.value}>{endValue}</div>
    </div>
  );
};

export default TimeDateView;
