var arrivalDatepicker = $A.setDatepicker({
  // Unique ID for the date picker instance
  // After instantiation, can be referenced using: var DC = $A("arrivalDateCalenderId");
  id: "arrivalDateCalenderId",

  // Icon triggering element
  toggle: $A.get("arrivalDateIcon"),

  // Native or simulated input element
  input: $A.get("arrivalDate"),
  openOnFocus: true,
    animate: {
      onRender: function(dc, wrapper, next) {
        $A.Velocity(wrapper, "transition.fadeIn", {
          complete: function() {
            // Running next() is required to continue executing built-in lifecycle methods such as afterRender() when the animation completes.
            next();
          }
        });
      },
      onRemove: function(dc, wrapper, next) {
        $A.Velocity(wrapper, "transition.fadeOut", {
          complete: function() {
            // Running next() is required to continue executing built-in lifecycle methods such as afterRender() when the animation completes.
            next();
          }
        });
      }
    }
  
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
    animate: {
      onRender: function(dc, wrapper, next) {
        $A.Velocity(wrapper, "transition.fadeIn", {
          complete: function() {
            // Running next() is required to continue executing built-in lifecycle methods such as afterRender() when the animation completes.
            next();
          }
        });
      },
      onRemove: function(dc, wrapper, next) {
        $A.Velocity(wrapper, "transition.fadeOut", {
          complete: function() {
            // Running next() is required to continue executing built-in lifecycle methods such as afterRender() when the animation completes.
            next();
          }
        });
      }
    }
  
});