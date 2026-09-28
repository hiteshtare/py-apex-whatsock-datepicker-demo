// ---------------------- Define Variables ---------------------- //
var maxStayDuration = 8;
var bookingHorizon = 180;
var arrivalCutoff = 10;

var ajax_data = [
    {
        "name": "Individual Retreat",
        "startdate": "2030-01-01",
        "enddate": "2030-01-01"
    },
    {
        "name": "Group Retreat",
        "startdate": "2030-01-01",
        "enddate": "2030-01-01"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-08-20",
        "enddate": "2026-08-24"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-08-20",
        "enddate": "2026-08-24"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-07-16",
        "enddate": "2026-07-20"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-07-16",
        "enddate": "2026-07-20"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-09-17",
        "enddate": "2026-09-21"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-09-17",
        "enddate": "2026-09-21"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-10-22",
        "enddate": "2026-10-26"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-10-22",
        "enddate": "2026-10-26"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-11-26",
        "enddate": "2026-11-30"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-11-26",
        "enddate": "2026-11-30"
    },
    {
        "name": "Individual Retreat",
        "startdate": "2026-12-24",
        "enddate": "2026-12-28"
    },
    {
        "name": "Group Retreat",
        "startdate": "2026-12-24",
        "enddate": "2026-12-28"
    },
    {
        "name": "Aug 22 - 23: When Will God Come to You?",
        "startdate": "2026-07-13",
        "enddate": "2026-08-19"
    },
    {
        "name": "Aug 22 - 23: When Will God Come to You?",
        "startdate": "2026-08-25",
        "enddate": "2027-02-24"
    },
    {
        "name": "Jul 18-19: God Communion Man's Greatest Necessity",
        "startdate": "2026-07-13",
        "enddate": "2026-07-15"
    },
    {
        "name": "Jul 18-19: God Communion Man's Greatest Necessity",
        "startdate": "2026-07-21",
        "enddate": "2027-01-20"
    },
    {
        "name": "Sep 19 - 20: Living the Divine Existence God Planned for You",
        "startdate": "2026-07-13",
        "enddate": "2026-09-16"
    },
    {
        "name": "Sep 19 - 20: Living the Divine Existence God Planned for You",
        "startdate": "2026-09-22",
        "enddate": "2027-03-21"
    },
    {
        "name": "Oct 24 - 25: Self-realization: Knowing Your Infinite Nature",
        "startdate": "2026-07-13",
        "enddate": "2026-10-21"
    },
    {
        "name": "Oct 24 - 25: Self-realization: Knowing Your Infinite Nature",
        "startdate": "2026-10-27",
        "enddate": "2027-04-26"
    },
    {
        "name": "Nov 28 - 29: Follow the Path of Great Ones",
        "startdate": "2026-07-13",
        "enddate": "2026-11-25"
    },
    {
        "name": "Nov 28 - 29: Follow the Path of Great Ones",
        "startdate": "2026-12-01",
        "enddate": "2027-05-30"
    },
    {
        "name": "Dec 26 - 27: How to Attune with Universal Kutastha Consciousness",
        "startdate": "2026-07-13",
        "enddate": "2026-12-23"
    },
    {
        "name": "Dec 26 - 27: How to Attune with Universal Kutastha Consciousness",
        "startdate": "2026-12-29",
        "enddate": "2027-06-28"
    }
]

var arrDisabledDays = [];
// ---------------------- Define Variables ---------------------- //

var dropdownPurposeOfVisit = $('#input_54_15');
// Change event for Purpose of visit dropdown
dropdownPurposeOfVisit.on('change', function () {
  console.log('jQuery:Pupose of Visit - selected: ', this.value);

  let foundData = ajax_data.filter((x) => x.name === this.value);
  console.warn('foundData');
  console.log(foundData);

  let mergedArray = foundData;

  // To check mergedArray is not empty
  console.warn('Datepicker: update mergedArray to Block Dates');
  console.warn(`mergedArray`);
  console.log(mergedArray);

  disabledDays = [];
  arrDisabledDays = [];

  mergedArray.forEach(function (item) {
    disabledDays += getDates(new Date(item.startdate), new Date(item.enddate));
    const disableDays = getDates(new Date(item.startdate), new Date(item.enddate));
    arrDisabledDays.push(...disableDays);
  });

  console.warn(`disabledDays`);
  console.log(disabledDays);
  console.warn(`arrDisabledDays`);
  console.log(arrDisabledDays);
});

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

initialiseDepartureDatepicker();

function initialiseDepartureDatepicker() { 
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
}

function restrictDepartureDate(selected) {
    const formattedSelectedArrivalDate = formatDate(selected);
    console.warn(`formattedSelectedArrivalDate`);
    console.log(formattedSelectedArrivalDate);

    const closestDate = closestValidDate(arrDisabledDays, selected);
    console.warn(`closestDate`);
    console.log(closestDate);

    initialiseDepartureDatepicker();

    var departureCalendarConfig = $A("departureDateCalenderId");
    departureCalendarConfig.minDate = formattedSelectedArrivalDate;
    departureCalendarConfig.maxDate = closestDate;

    var datepickerDeparture = document.getElementById('departureDate');
    datepickerDeparture.value = selected;

    // departureCalendarConfig.remove(); // Closes the calendar panel
    // departureCalendarConfig.render(); // Re-opens with the newly bound minDate constraints
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

function getDates(startDate, stopDate) {
                    var dateArray = new Array();
                    var currentDate = startDate;
                    while (currentDate <= stopDate) {
                        var currentDateStr = formatDateToString(currentDate);
                        dateArray.push(currentDateStr)
                        currentDate = currentDate.addDays(1);
                    }
                    return dateArray;
}
                
function formatDateToString(date) {
                    const dd = String(date.getDate()).padStart(2, '0');
                    
                    // Months are 0-indexed (0 = January), so add 1
                    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
                    
                    // Get the last 4 digits of the year
                    const yyyy = String(date.getFullYear()); 

                    return `${yyyy}/${mm}/${dd}`;
                }