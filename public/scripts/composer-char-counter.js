$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    let message = $(this).val();
    let output = 140 - message.length;
    let outputCounter = $(this).siblings().children(".counter");
    if (output < 0) {
      outputCounter.css("color", "red");
    }
    if (output >= 0) {
      outputCounter.css("color", "DimGray");
    }
    $(outputCounter).val(output);
  });
});
