const todayDateNoHours = new Date().setHours(0, 0, 0, 0);
export const currentDateMillis = todayDateNoHours.toString();

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function currentDateLongString() {
  const date = new Date();
  const dayOfWeek = weekday[date.getDay()];
  const dateNumber = date.getDate();
  const dateMonth = month[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek} ${dateNumber} ${dateMonth} ${year}`
}