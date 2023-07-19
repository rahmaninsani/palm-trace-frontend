import moment from "moment/min/moment-with-locales";

moment.locale("id");

const formatTime = (datetime) => {
  const gmt = datetime.split("+")[1];

  let timeZone;
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
