export const convertKey = (key) => {
  switch (key) {
    case "subject_id":
      key = "Môn học";
      break;
    case "tutor_id":
      key = "Gia sư";
      break;
    case "student_id":
      key = "Học viên";
      break;
    case "is_accepted":
      key = "Trạng thái";
      break;
    case "price":
      key = "Giá";
      break;
    case "time":
      key = "Thòi gian học";
      break;
    case "createdAt":
      key = "Ngày đăng kí";
      break;
    case "num_sessions":
      key = "Số buổi học";
      break;
    default:
      break;
  }
  return key;
};

export const convertValues = (arr) => {
  const convertedArr = arr.map((item) => {
    const [day, time] = item.split("-");
    let dayOfWeek;
    switch (day) {
      case "2":
        dayOfWeek = "Thứ 2";
        break;
      case "3":
        dayOfWeek = "Thứ 3";
        break;
      case "4":
        dayOfWeek = "Thứ 4";
        break;
      case "5":
        dayOfWeek = "Thứ 5";
        break;
      case "6":
        dayOfWeek = "Thứ 6";
        break;
      case "7":
        dayOfWeek = "Thứ 7";
        break;
      case "8":
        dayOfWeek = "Chủ nhật";
        break;
      default:
        break;
    }

    let timeRange;
    switch (time) {
      case "1":
        timeRange = "7h -> 8h30";
        break;
      case "2":
        timeRange = "7h30 -> 9h";
        break;
      case "3":
        timeRange = "8h -> 9h30";
        break;
      case "4":
        timeRange = "8h30 -> 10h";
        break;
      case "5":
        timeRange = "9h -> 10h30";
        break;
      case "6":
        timeRange = "9h30 -> 11h";
        break;
      case "7":
        timeRange = "10h -> 11h30";
        break;
      case "8":
        timeRange = "10h30 -> 12h";
        break;
      case "9":
        timeRange = "11h -> 12h30";
        break;
      case "10":
        timeRange = "11h30 -> 13h";
        break;
      case "11":
        timeRange = "12h -> 13h30";
        break;
      case "12":
        timeRange = "12h30 -> 14h";
        break;
      case "13":
        timeRange = "13h -> 14h30";
        break;
      case "14":
        timeRange = "13h30 -> 15h";
        break;
      case "15":
        timeRange = "14h -> 15h30";
        break;
      case "16":
        timeRange = "14h30 -> 16h";
        break;
      case "17":
        timeRange = "15h -> 16h30";
        break;
      case "18":
        timeRange = "15h30 -> 17h";
        break;
      case "19":
        timeRange = "16h -> 17h30";
        break;
      case "20":
        timeRange = "16h30 -> 18h";
        break;
      case "21":
        timeRange = "17h -> 18h30";
        break;
      case "22":
        timeRange = "17h30 -> 19h";
        break;
      case "23":
        timeRange = "18h -> 19h30";
        break;
      case "24":
        timeRange = "18h30 -> 20h";
        break;
      case "25":
        timeRange = "19h -> 20h30";
        break;
      case "26":
        timeRange = "19h30 -> 21h";
        break;
      case "27":
        timeRange = "20h -> 21h30";
        break;
      case "28":
        timeRange = "21h30 -> 22h";
        break;
      default:
        break;
    }

    return `${dayOfWeek} ( ${timeRange} )`;
  });

  return convertedArr;
};
