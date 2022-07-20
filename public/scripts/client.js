/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */


$(document).ready(() => {
  
  //formats tweet from data
  const $createTweetElement = (tweetData) =>{
   
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
    ${timeago.format(tweetData.created_at)}
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
    tweetArticle += '</article>';
    return tweetArticle;
  };
  
  //posts formated tweet from data
  const $renderTweets = function(tweetObjectsArr) {
    //take in array of tweet objects
    for (let tweet of tweetObjectsArr) {
      //for each object, append each tweet to the tweet-area
      $(".tweet-area").append($createTweetElement(tweet));
    }


  };
  
  //submit new tweet to data when client hits submit
  $('.new-tweet').submit(
    (postTweet) => {
      event.preventDefault(); //do not submit form as usual
      
      //get tweet text and serialize it
      let $tweetText = $("#tweet-text").serialize();
     
      //if no data is input send do not send, will complete at later date with better warning
      if ($tweetText.length < 6) {
        alert("Please input text before submitting!");
      } else if($tweetText.length > 146){
        alert("Please limit post to 140 characters.")

      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $tweetText,
          success: loadTweets()
        });

        //clear tweet text input field
        $("#tweet-text").val("");
        //reset counter to 140 left
        $('.new-tweet').find('output[name="counter"]').val(140);
      }

      
    });
  
  //call to render tweets when page is done loading
  const loadTweets = () => {
    $.ajax("./tweets", {
      method: 'GET',
      dataType: "json"
    })
    .then(function (response){
      $renderTweets(response);
    });
  };

      //load all current tweets at time of page load
    loadTweets();

  
  
});

