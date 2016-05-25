// Language picker dropdown interface

$(document).ready(function() {
  $(".langpicker-link").click(function() {
    togglePicker();
    return false;
  })
});

function togglePicker() {
  var $langpicker = $("#langpicker");
  $langpicker.slideToggle(300);
}
