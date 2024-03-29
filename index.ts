export type Time = {
  h: number;
  m: number;
  p: "AM" | "PM";
};

export function toTime(t: string): Time {
  if (!t) return { h: 9, m: 0, p: "AM" };
  let groups = /(\d+):(\d+).*(..)$/.exec(t);
  if (!groups) throw Error("Invalid time string passed: " + t);
  const [, hrs, min, period] = groups;
  let h = Number(hrs);
  let m = Number(min);
  let p = period;

  if (period !== "AM" && period !== "PM") {
    p = h < 12 || h === 24 ? "AM" : "PM";
    h = h % 12 || 12;
  }
  return { h, m, p: p as "AM" | "PM" };
}

export function getValue(time?: Time): number {
  if (!time) return 0;
  // if (time.p === "AM" && time.h === 12) return time.m;
  // Considering 12:00 AM is max time
  if (time.p === "AM" && time.h === 12) return 24 * 60 + time.m;
  return (time.h + (time.p === "PM" && time.h !== 12 ? 12 : 0)) * 60 + time.m;
}

export function isBetween(time: Time, start: Time, end: Time) {
  const st = getValue(time);
  return getValue(start) <= st && st <= getValue(end);
}

export function formatTime(time: Time): string {
  return `${padZero(time.h)}:${padZero(time.m)} ${time.p}`;
}

export function addMinutes(time: Time, minutes: number): Time {
  if (minutes === 0) return time;
  const totalM = getValue(time) + minutes;
  const hrs = Math.floor(totalM / 60);
  const m = totalM % 60;
  const h = hrs % 12 || 12;
  const period = hrs < 12 || hrs === 24 ? "AM" : "PM";
  return { h, m, p: period as "AM" | "PM" };
}

export function padZero(str: string | number, length: number = 2): string {
  return str.toString().padStart(length, "0");
}
