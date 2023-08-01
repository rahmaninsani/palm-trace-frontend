import moment from "moment/min/moment-with-locales";

moment.locale("id");

const formatTime = (datetime) => {
  if (datetime?.split("-").length === 2) return moment(datetime).format("MMMM YYYY");

  const gmt = datetime?.split("+")[1];
  if (!gmt) return moment(datetime).format("DD MMMM YYYY");

  let timeZone = "";
  switch (gmt) {
    case "07:00":
      timeZone = "WIB";
      break;
    case "08:00":
      timeZone = "WITA";
      break;
    case "09:00":
      timeZone = "WIT";
  }

  return `${moment(datetime).format("DD MMMM YYYY, HH:mm:ss")} ${timeZone}`;
};

export { formatTime };
