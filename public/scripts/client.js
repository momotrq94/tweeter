/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Safeguard function for Cross Site Scripting
const escapes = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Create Tweet function
const createTweetElement = function (obj) {
  let time = timeago.format(obj.created_at, "pt_BR");
  const $output = $(`<article class="posted-tweets">
  <header class="tweet-header">
    <div class="avatar-container">
      <img class="tweet-image" src="${obj.user.avatars}" />
      <div class="avatar-text">${obj.user.name}</div>
    </div>
    <div class="username">${obj.user.handle}</div>
  </header>
  <div class="tweet-div">
    ${escapes(obj.content.text)}
  </div>
  <footer class="tweet-footer">
    <div class="tweet-time">${time}</div>
    <div class="icons">
      <i class="fa-solid fa-flag" id="blueicon"></i>
      <i class="fa-solid fa-retweet" id="blueicon"></i>
      <i class="fa-solid fa-heart" id="blueicon"></i>
    </div>
  </footer>
</article>`);

  return $output;
};

//Function to render all tweets in database
const renderTweets = function (array) {
  for (const tweet of array) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};
//Function to render just last tweet
const renderLastTweet = function (tweet) {
  $("#tweets-container").prepend(createTweetElement(tweet));
};

//Document Ready
$(() => {
  $(".new-tweet-button").on("click", function () {
    $("#post-tweet").slideToggle();
  });

  $("#post-tweet").submit(function (event) {
    event.preventDefault();

    let $tweetText = $(this).children("#tweet-text").val();
    let $counter = $(this).find(".counter").val();

    if ($tweetText === "") {
      $("#error-box").slideDown("slow");
      $("#error-box").css("display", "flex");
      $("#error-message").text("Cannot post empty tweet");
      return;
    }

    if ($counter < 0) {
      $("#error-box").slideDown("slow");
      $("#error-box").css("display", "flex");
      $("#error-message").text("Cannot exceed 140 character limit");
      return;
    }

    $("#error-box").slideUp("fast");

    const formData = $(this).serialize();
    console.log(this, formData);
    $.ajax({
      method: "POST",
      data: formData,
      url: "/tweets",
    })
      .then((res) => {
        $("#post-tweet")[0].reset();
        loadlastTweet();
      })
      .catch((error) => console.log(error));
  });
  function loadTweets() {
    $.ajax({ method: "GET", url: "/tweets", dataType: "json" })
      .then((res) => {
        renderTweets(res);
      })
      .catch((error) => console.log(error));
  }

  function loadlastTweet() {
    $.ajax({ method: "GET", url: "/tweets", dataType: "json" })
      .then((res) => {
        renderLastTweet(res[res.length - 1]);
      })
      .catch((error) => console.log(error));
  }

  loadTweets();
});
