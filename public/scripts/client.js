/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (obj) {
  const $output = $(`<article class="posted-tweets">
  <header class="tweet-header">
    <div class="avatar-container">
      <img class="tweet-image" src="${obj.user.avatars}" />
      <div class="avatar-text">${obj.user.name}</div>
    </div>
    <div class="username">${obj.user.handle}</div>
  </header>
  <div class="tweet-div">
    ${obj.content.text}
  </div>
  <footer class="tweet-footer">
    <div class="tweet-time">${obj.created_at} ago</div>
    <div class="icons">
      <i class="fa-solid fa-flag" id="blueicon"></i>
      <i class="fa-solid fa-retweet" id="blueicon"></i>
      <i class="fa-solid fa-heart" id="blueicon"></i>
    </div>
  </footer>
</article>`);

  return $output;
};

const renderTweets = function (array) {
  for (const tweet of array) {
    $("#tweets-container").append(createTweetElement(tweet));
  }
};

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

//shorthand of document.ready
$(() => {
  renderTweets(data);
});
