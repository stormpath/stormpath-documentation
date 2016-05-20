// Language picker dropdown interface
function togglePicker() {
  var picker = document.getElementsByClassName("langpicker")[0];
  if (picker) {
    picker.style.display = picker.style.display === 'none' ? '' : 'none';
  }
}
