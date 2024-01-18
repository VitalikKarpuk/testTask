import { daysOfWeekOptions } from "./constants";

export const creteStringTime = (time) => {
  return `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:${
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  }`;
};

export const transformtoValidDate = (date) => {
  const arrDate = date.split(".");

  return new Date(`${arrDate[1]}.${arrDate[0]}.${arrDate[2]}`);
};
export const createDateString = (date) => {
  if (!date) return null;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getTime = (hour, min) => {
  const time = new Date(new Date(2014, 0, 1, hour, min));

  return creteStringTime(time);
};

export const addHour = (time, amount) => {
  const parsedTime = time.split(":");
  const currentTime = new Date(
    new Date(2014, 0, 1, parsedTime[0], parsedTime[1])
  );
  currentTime.setHours(currentTime.getHours() + amount || 1);
  return creteStringTime(currentTime);
};

export const minusHour = (time) => {
  const parsedTime = time.split(":");
  const currentTime = new Date(
    new Date(2014, 0, 1, parsedTime[0], parsedTime[1])
  );
  currentTime.setHours(currentTime.getHours() - 1);
  return creteStringTime(currentTime);
};

export const addMinuts = (minut, amount) => {
  const parsedTime = amount?.split(":");

  const currentTime = new Date(
    new Date(2014, 0, 1, parsedTime?.[0] || 7, parsedTime?.[1] || 0)
  );
  currentTime.setMinutes(currentTime.getMinutes() + minut);
  return creteStringTime(currentTime);
};

export const minusMinuts = (minut, amount) => {
  const parsedTime = amount.split(":");
  const currentTime = new Date(
    new Date(2014, 0, 1, parsedTime?.[0] || 7, parsedTime?.[1] || 0)
  );
  currentTime.setMinutes(currentTime.getMinutes() - minut);
  return creteStringTime(currentTime);
};

export const handleDayClick = (day, currentDays) => {
  if (currentDays.includes(day)) {
    if (day.value.includes("/")) {
      return [];
    }
    return currentDays.filter(
      (selectedDay) =>
        !selectedDay.value.split("/").includes(day.value) &&
        selectedDay.value !== day.value
    );
  } else {
    if (day.value === "ВТ/ЧТ") {
      return [
        daysOfWeekOptions.find(({ value }) => value === "ВТ"),
        daysOfWeekOptions.find(({ value }) => value === "ЧТ"),
      ];
    } else if (day.value === "ПН/СР/ПТ") {
      return [
        daysOfWeekOptions.find(({ value }) => value === "ПН"),
        daysOfWeekOptions.find(({ value }) => value === "СР"),
        daysOfWeekOptions.find(({ value }) => value === "ПТ"),
      ];
    } else {
      return [...currentDays, day];
    }
  }
};

export function getDayOfWeek(dateObject) {
  const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const dayIndex = dateObject.getDay();

  return daysOfWeek[dayIndex];
}

function daysBetween(currentDayIndex, nextDayIndex, currentDate) {
  const daysInWeek = 7;
console.log(currentDate.getDate() === new Date().getDate());
  let daysDifference = nextDayIndex - currentDayIndex;
  if (currentDayIndex === nextDayIndex && currentDate.getDate() !== new Date().getDate()) {
    return 7;
  }

  if (daysDifference < 0) {
    daysDifference += daysInWeek;
  }

  return daysDifference;
}

function findClosestGreaterNumber(target, numbers) {
  const greaterNumbers = numbers
    .filter(({ day }) => day > target || day === 0)
    .map(({ day }) => {
      if (day === 0) {
        return 7;
      }
      return day;
    });
  const minNumbers = numbers
    .filter(({ day }) => day <= target && day !== 0)
    .map(({ day }) => {
      if (day === 0) {
        return 7;
      }
      return day;
    });

  if (greaterNumbers.length !== 0) {
    return Math.min(...greaterNumbers);
  }

  // Находим минимальное из найденных больших чисел
  const closestGreaterNumber = Math.min(...minNumbers);
  return closestGreaterNumber;
}

export function getNextWorkingDay(
  schedule,
  currentDate,
  totalHours,
  hoursPerDay
) {
  console.log('sdfsdbhfjk');
  const currentDayOfWeek = currentDate.getDay();
  let currentTotalHours = totalHours;
  let result = currentDate;
  if (totalHours === 1) {
    const dayBetween = daysBetween(
      currentDayOfWeek,
      findClosestGreaterNumber(currentDayOfWeek, schedule),
      currentDate
    );
    result.setDate(result.getDate() + dayBetween);
    return createDateString(result);
  }
  if (totalHours > 1 && hoursPerDay === 1) {
    while (currentTotalHours > 0) {
      const dayBetween = daysBetween(
        result.getDay(),
        findClosestGreaterNumber(result.getDay(), schedule),
        result
      );
      result.setDate(result.getDate() + dayBetween);
      currentTotalHours--;
    }
    return createDateString(result);
  }
  while (currentTotalHours > 0) {
    const dayBetween = daysBetween(
      result.getDay(),
      findClosestGreaterNumber(result.getDay(), schedule),
      result
    );
    result.setDate(result.getDate() + dayBetween);
    currentTotalHours -= hoursPerDay;
  }
  return createDateString(result);
}
