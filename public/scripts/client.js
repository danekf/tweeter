/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1658163449269
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1658249849269
  }
]

$(document).ready(() => {
  //formats tweet from data
  const $createTweetElement = (tweetData) =>{
    //convert date timestamp
    let tweetDate = new Date(tweetData.created_at);
    let currentDate = new Date()
    
    let timeSince = currentDate.getTime() - tweetDate.getTime();
    timeSince = Math.ceil(timeSince / (1000 * 3600 * 24));
 

    //open article
    let tweetArticle = '<article class = "tweet">';
    
    //add header data (identifying info about user)
    tweetArticle += `<header><ul>
      <li>
      <img src= ${tweetData.user.avatars}/>
      </li>
      <li>${tweetData.user.handle}</li>
      </ul>
      </header>
    `;
    
    //add body/div data (text)
    tweetArticle += `<div>
      ${tweetData.content.text};
      </div>
    `;
    
    //add footer data (date and icons)
    tweetArticle += `<footer>
      ${timeSince} days ago
      `;

    //add unchanging bottom icons
    tweetArticle += `<ul>
      <li class = "icons"><i class="fa-solid fa-flag"></i></li>
      <li class = "icons"><i class="fa-solid fa-retweet"></i></li> 
      <li class = "icons"><i class="fa-solid fa-heart"></i></li>  
      </li>
      </ul>
      </footer>
    `;  

    
    //finish article
    tweetArticle += '</article>'
    return tweetArticle;
  }
  
  //posts formated tweet from data
  const $renderTweets = function (tweetObjectsArr) {
    //take in array of tweet objects
    for (let tweet of tweetObjectsArr){
      //for each object, append each tweet to the tweet-area
      $(".tweet-area").append($createTweetElement(tweet));
    }


  }
  
  //submit new tweet to data when client hits submit
  $('.new-tweet').submit(
    (postTweet) => {
      event.preventDefault(); //do not submit form as usual
      
      //get tweet text and serialize it
      let $tweetText = $("#tweet-text").serialize();
     
      //if no data is input send do not send, will complete at later date with better warning
      if ($tweetText.length < 6){
        alert("Please input text before submitting!");
      }
      else{
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $tweetText,
        })   

      }



      //clear tweet text input field
      $("#tweet-text").val(""); 
      //reset counter to 140 left
      $('.new-tweet').find('output[name="counter"]').val(140);     
      
    });
    
  //call to render tweets when page is done loading
  $renderTweets(tweetData);
  
});

