var datepicker = $A.setDatepicker({
  // Unique ID for the date picker instance
  // After instantiation, can be referenced using: var DC = $A("UniqueCalendarId");
  id: "UniqueCalendarId",

  // Icon triggering element
  toggle: $A.get("dateIcon2"),

  // Native or simulated input element
  input: $A.get("dateId2"),
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