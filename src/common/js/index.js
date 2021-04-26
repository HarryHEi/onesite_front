export function dateInstanceFormatter(date) {
  return date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    "-" +
    date.getDate().toString().padStart(2, '0') +
    " " +
    date
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getSeconds()
      .toString()
      .padStart(2, "0")
}

export function datetimeFormatter(dateStr) {
  if (!dateStr) {
    return ''
  }

  const date = new Date(dateStr);

  return dateInstanceFormatter(date)
}

export function utcDatetimeFormatter(dateStr) {
  if (!dateStr) {
    return ''
  }

  const date = new Date(dateStr);
  date.setTime(date.getTime() + 8 * 3600 * 1000);

  return dateInstanceFormatter(date)
}
