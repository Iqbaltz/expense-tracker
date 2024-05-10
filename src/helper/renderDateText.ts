import moment from "moment";

export function renderDateText(date: Date) {
  if (moment(date).isSame(new Date(), "day")) {
    return "Today";
  }

  if (
    moment(date).isSame(new Date().setDate(new Date().getDate() - 1), "day")
  ) {
    return "Yesterday";
  }

  return moment(date).format("D MMM YYYY");
}
