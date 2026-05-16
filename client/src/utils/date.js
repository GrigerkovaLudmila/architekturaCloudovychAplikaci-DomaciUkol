export function formatDate(dateValue) {
  if (!dateValue) return "";

  const [year, month, day] = String(dateValue).split("-");

  if (!year || !month || !day) return dateValue;

  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

export function parseDisplayDate(displayDateValue) {
  const value = String(displayDateValue || "").trim();
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) return null;

  const [, day, month, year] = match;
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  const isRealDate =
    parsedDate.getFullYear() === Number(year) &&
    parsedDate.getMonth() === Number(month) - 1 &&
    parsedDate.getDate() === Number(day);

  if (!isRealDate) return null;

  return `${year}-${month}-${day}`;
}

export function isFutureDateInputValue(dateInputValue) {
  if (!dateInputValue) return false;

  const [year, month, day] = String(dateInputValue).split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date > today;
}

export function getTomorrowDateInputValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function compareByExpirationDate(a, b) {
  return new Date(a.expirationDate) - new Date(b.expirationDate);
}
