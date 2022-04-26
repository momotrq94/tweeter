$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    let message = $(this).val();
    let output = 140 - message.length;
    let outputCounter = $(this).siblings().children(".counter");
    $(outputCounter).val(output);
  });
});
