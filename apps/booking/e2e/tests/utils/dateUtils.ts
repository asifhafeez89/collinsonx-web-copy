export function getOneMonthFromToday() {
  // Get today's date
  var today = new Date();

  // Add 1 month to the current date
  var nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  // Define months and their names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get day, month, and year
  var day = nextMonth.getDate();
  var monthIndex = nextMonth.getMonth();
  var year = nextMonth.getFullYear();

  // Format the date string
  var formattedDate = day + ' ' + months[monthIndex] + ' ' + year;

  return { Date: nextMonth, String: formattedDate };
}

export function getTomorrow() {
  // Get today's date
  var today = new Date();

  // Add 1 day to the current date
  var nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  // Define months and their names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get day, month, and year
  var day = nextDay.getDate();
  var monthIndex = nextDay.getMonth();
  var year = nextDay.getFullYear();

  // Format the date string
  var formattedDate = day + ' ' + months[monthIndex] + ' ' + year;

  return { Date: nextDay, String: formattedDate };
}
