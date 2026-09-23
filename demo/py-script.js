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
  inputDateFormat: 'DD/MM/YYYY',
  minDate: 10,
  maxDate: 180,
  wdOffset: 0, // 0 is Sunday
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
  inputDateFormat: 'DD/MM/YYYY',
  minDate: 10,
  maxDate: 180,
  wdOffset: 0, // 0 is Sunday
});