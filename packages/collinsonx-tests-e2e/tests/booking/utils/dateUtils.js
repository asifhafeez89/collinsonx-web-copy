export function getOneMonthFromTodayDate() {
  // Get today's date
  var today = new Date();

  // Add 1 month to the current date
  var nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  // Define months and their names
  var months = [
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

  return formattedDate;
}
