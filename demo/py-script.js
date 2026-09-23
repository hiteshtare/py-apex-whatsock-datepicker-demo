// ---------------------- Define Variables ---------------------- //
var maxStayDuration = 8;
var bookingHorizon = 180;
var arrivalCutoff = 10;
var arrDisabledDays = ['2030/01/01', '2026/08/20', '2026/08/21', '2026/08/22', '2026/08/23', '2026/08/24', '2026/09/17', '2026/09/18', '2026/09/19', '2026/09/20', '2026/09/21', '2026/10/22', '2026/10/23', '2026/10/24', '2026/10/25', '2026/10/26', '2026/11/26', '2026/11/27', '2026/11/28', '2026/11/29', '2026/11/30', '2026/12/24', '2026/12/25', '2026/12/26', '2026/12/27', '2026/12/28'];

console.warn(`arrDisabledDays`);
console.log(arrDisabledDays);
// ---------------------- Define Variables ---------------------- //

var arrivalDatepicker = $A.setDatepicker({
  // Unique ID for the date picker instance
  // After instantiation, can be referenced using: var DC = $A("arrivalDateCalenderId");
  id: "arrivalDateCalenderId",

  // Icon triggering element
  toggle: $A.get("arrivalDateIcon"),

  // Native or simulated input element
  input: $A.get("arrivalDate"),
  // style: { position: "relative", zIndex: 1, display: "none" },
  openOnFocus: true,
  inputDateFormat: "DD/MM/YYYY",
  minDate: arrivalCutoff,
  maxDate: bookingHorizon,
  wdOffset: 0, // 0 is Sunday
  configure: function( dc ) {
      for ( const dateStr of arrDisabledDays ) {
          const disabledDate = new Date( dateStr );
          const y = disabledDate.getFullYear();
          const monthIndex = disabledDate.getMonth();
          const day = disabledDate.getDate();
          if ( ! dc.range[ monthIndex ].disabled[ y ] ) {
              dc.range[ monthIndex ].disabled[ y ] = [];
          }
          dc.range[ monthIndex ].disabled[ y ].push( day );
      }
      return true;
  },
  onActivate: function (event, dc) {
    const selected = dc.formatDate(dc);
    dc.target.value = selected;
    restrictDepartureDate(selected);
    dc.remove();
  },
});

// datepicker.render(); // Manually open the datepicker. ~

var departureDatepicker = $A.setDatepicker({
  // Unique ID for the date picker instance
  // After instantiation, can be referenced using: var DC = $A("departureDateCalenderId");
  id: "departureDateCalenderId",

  // Icon triggering element
  toggle: $A.get("departureDateIcon"),

  // Native or simulated input element
  input: $A.get("departureDate"),
  openOnFocus: true,
  inputDateFormat: "DD/MM/YYYY",
  minDate: arrivalCutoff,
  maxDate: bookingHorizon,
  wdOffset: 0, // 0 is Sunday
  configure: function( dc ) {
    for ( const dateStr of arrDisabledDays ) {
        const disabledDate = new Date( dateStr );
        const y = disabledDate.getFullYear();
        const monthIndex = disabledDate.getMonth();
        const day = disabledDate.getDate();
        if ( ! dc.range[ monthIndex ].disabled[ y ] ) {
            dc.range[ monthIndex ].disabled[ y ] = [];
        }
        dc.range[ monthIndex ].disabled[ y ].push( day );
    }
    return true;
  },
});

function restrictDepartureDate(selected) {
  var departureCalendarConfig = $A("departureDateCalenderId");
  if (departureCalendarConfig) {
    const formattedSelectedArrivalDate = formatDate(selected);
    console.warn(`formattedSelectedArrivalDate`);
    console.log(formattedSelectedArrivalDate);
    departureCalendarConfig.minDate = formattedSelectedArrivalDate;

    const closestDate = closestValidDate(arrDisabledDays, selected);
    console.warn(`closestDate`);
    console.log(closestDate);

    departureCalendarConfig.maxDate = closestDate;

    var datepickerDeparture = document.getElementById('departureDate');
    datepickerDeparture.value = selected;


    departureCalendarConfig.remove(); // Closes the calendar panel
    departureCalendarConfig.render(); // Re-opens with the newly bound minDate constraints
  }
}

function formatDate(date) {
  if (date) {
    const result = date.split("/");
    const formattedDate = new Date(
      parseInt(result[2], 10),
      parseInt(result[1], 10) - 1,
      parseInt(result[0], 10),
    );
    return formattedDate;
  }
}

function closestValidDate(dates, param) {
  let nearest = Infinity;
  let winner = -1;

  const target = formatDate(param);

  dates.forEach(function (item, index) {
    const date = new Date(item);

    let distance = date - target;
    if (distance < nearest && distance > 0) {
      nearest = distance;
      winner = index;
    }
  });

  // return winner;
  // return dates[winner];
  if (winner == -1) {
    let date1 = formatDate(param);
    return date1.addDays(maxStayDuration - 1);
  } else {
    let date1 = formatDate(param);
    let date2 = new Date(dates[winner]);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > maxStayDuration - 1) {
      return date1.addDays(maxStayDuration - 1);
    } else return new Date(dates[winner]);
  }
}

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}