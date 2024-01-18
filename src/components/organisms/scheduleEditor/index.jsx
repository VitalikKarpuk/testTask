import classNames from "classnames";
import Dropdown from "../../molecules/dropdown";
import style from "./index.module.css";
import {
  academicOptions,
  audienceOptions,
  breaks,
  daysOfWeekOptions,
  teachersOptions,
} from "./constants";
import { useState } from "react";
import Counter from "../../molecules/counter";
import Button, { BUTTON_TYPES } from "../../atoms/button";
import TimeDateView from "../../molecules/timeDateView";
import {
  addHour,
  addMinuts,
  createDateString,
  getNextWorkingDay,
  handleDayClick,
  minusHour,
  minusMinuts,
  transformtoValidDate,
} from "./helper";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { ReactComponent as CloseIcon } from "./close.svg";

const initHourEndPeriod = "07:45";

const ScheduleEditor = ({ onClose }) => {
  const now = new Date();
  const initTypeHour = academicOptions.find(({ isInit }) => isInit);
  const [state, setState] = useState({
    typeHour: initTypeHour?.value,
    break: 0,
    teacher: null,
    audience: null,
    allTime: 1,
    timeInDay: 1,
    dayPeriod: {
      start: createDateString(now),
      end: createDateString(now),
    },
    daysOfWeek: [],
    hourPeriod: {
      start: "07:00",
      end: initHourEndPeriod,
    },
  });

  const selectedHourPeriod = state.hourPeriod.end;

  const onTypeHourChange = (value) => {
    setState({
      ...state,
      typeHour: value,
      // timeInDay: 0,
      hourPeriod: {
        start: state.hourPeriod.start,
        end: addHour(
          addMinuts(
            academicOptions.find((item) => item.value === value)?.hourPeriod
          ),
          state.timeInDay - 1
        ),
      },
    });
  };

  const onChangeTeacher = (value) => {
    setState({
      ...state,
      teacher: value,
    });
  };

  const handleAllTime = (value) => {
    setState({
      ...state,
      allTime: value,
      dayPeriod: {
        start: state.dayPeriod.start,
        end:
          state.daysOfWeek.length &&
          getNextWorkingDay(
            state.daysOfWeek,
            transformtoValidDate(state.dayPeriod.start),
            value,
            state.timeInDay
          ),
      },
    });
  };
  const handleTimeInDay = (value) => {
    if (state.allTime < value) return null;
    const endTime =
      value >= state.timeInDay
        ? addHour(state.hourPeriod.end, 1)
        : minusHour(state.hourPeriod.end);

    setState({
      ...state,
      timeInDay: value,
      hourPeriod: {
        start: state.hourPeriod.start,
        end: endTime,
      },
      dayPeriod: {
        start: state.dayPeriod.start,
        end:
          state.daysOfWeek.length &&
          getNextWorkingDay(
            state.daysOfWeek,
            transformtoValidDate(state.dayPeriod.start),
            state.allTime,
            value
          ),
      },
    });
  };

  const handleAudience = (value) => {
    setState({
      ...state,
      audience: value,
    });
  };

  const onBreakChange = (value) => {
    const endTime =
      parseFloat(value) > parseFloat(state.break)
        ? addMinuts(
            parseFloat(value) - parseFloat(state.break),
            state.hourPeriod.end
          )
        : minusMinuts(
            parseFloat(state.break) - parseFloat(value),
            state.hourPeriod.end
          );

    setState({
      ...state,
      break: value,
      hourPeriod: {
        start: state.hourPeriod.start,
        end: endTime,
      },
    });
  };

  const onChangeDayOfWeek = (value) => {
    const daysOfWeek = handleDayClick(value, state.daysOfWeek).sort(
      (a, b) => a.day - b.day
    );
    setState({
      ...state,
      daysOfWeek: daysOfWeek,
      dayPeriod: {
        start: state.dayPeriod.start,
        end:
          daysOfWeek.length &&
          getNextWorkingDay(
            handleDayClick(value, state.daysOfWeek),
            now,
            state.allTime,
            state.timeInDay
          ),
      },
    });
  };

  const handleDate = (value) => {
    setState({
      ...state,
      dayPeriod: {
        start: value,
        end:
          state.daysOfWeek.length &&
          getNextWorkingDay(
            state.daysOfWeek,
            transformtoValidDate(value),
            state.allTime,
            state.timeInDay
          ),
      },
    });
  };

  const addSchedule = () => {
    console.log(state);
  };

  return (
    <div className={style.modal}>
      <div className={style.wrapper}>
        <div className={style.header}>
          Hедоктирование расписания
          <CloseIcon onClick={onClose} />
        </div>
        <hr />
        <div className={style.dropdownWrapper}>
          <div className={classNames(style.line, style.firstLine)}>
            <Dropdown
              dropdownOptions={academicOptions}
              onChange={onTypeHourChange}
              initialValue={initTypeHour.value}
            />
            <Counter
              text="Всего часов"
              onChange={handleAllTime}
              value={state.allTime}
            />
            <TimeDateView
              startValue={state.dayPeriod.start}
              endValue={state.dayPeriod.end}
              onChange={handleDate}
            />
          </div>
          <div className={style.daysOfWeek}>
            {daysOfWeekOptions.map((day) => {
              return (
                <Button
                  key={day.id}
                  text={day.value}
                  onClick={() => onChangeDayOfWeek(day)}
                  type={
                    state.daysOfWeek?.some(
                      (item) => item.value === day.value
                    ) && BUTTON_TYPES.blue
                  }
                />
              );
            })}
          </div>
          <div className={classNames(style.line, style.thirdLine)}>
            <Dropdown
              dropdownOptions={breaks}
              placeholder={"Без перерыва"}
              onChange={onBreakChange}
            />
            <Counter
              text="Часов в день"
              onChange={handleTimeInDay}
              value={state.timeInDay}
            />
            <TimeDateView startValue="07:00" endValue={selectedHourPeriod} />
          </div>
          <div className={classNames(style.line, style.fourthLine)}>
            <Dropdown
              dropdownOptions={teachersOptions}
              placeholder="Выберете преподавателя на это время"
              onChange={onChangeTeacher}
            />
            <Dropdown
              dropdownOptions={audienceOptions}
              className={style.audience}
              placeholder="Аудитория"
              onChange={handleAudience}
            />
          </div>
        </div>
        <hr />
        <div className={style.buttonBlock}>
          <Button onClick={addSchedule} text={"Добавить расписание"} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditor;
