/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function */


$(document).ready(() => {

  //escape function for special characters
  const escape = function (string) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  }
  
  //formats tweet from data
  const $createTweetElement = (tweetData) =>{
    let text = tweetData.content.text;
    let handle = tweetData.user.handle;
   
    //open article
    let tweetArticle = '<article class = "tweet">';
    
    //add header data (identifying info about user)
    tweetArticle += `<header><ul>
    <li>
    <img src= ${tweetData.user.avatars}/>
    </li>
    <li>${escape(handle)}</li>
    </ul>
    </header>
    `;
    
    //add body/div data (text)
    tweetArticle += `<div>${escape(text)}</div>`;

    
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

  //resize text box area automatically: sourced from https://www.techiedelight.com/automatically-resize-textarea-height-javascript/
  $("#tweet-text").on('keyup keypress', function() {
    $(this).height(0);
    $(this).height(this.scrollHeight);
  });

  //posts formated tweet from data
  const $renderTweets = function(tweetObjectsArr) {
    //take in array of tweet objects
    for (let tweet of tweetObjectsArr) {
      //for each object, append each tweet to the tweet-area
      $(".tweet-area").prepend($createTweetElement(tweet));
    };
  };
  
  //submit new tweet to data when client hits submit
  $('.create-tweet').submit(
    (event) => {
      event.preventDefault(); //do not submit form as usual
      
      //get tweet text sanitize it with .text, and serialize it
      let $tweetText = $("#tweet-text").serialize();
      $("#alert").slideUp(250);

     
      //Data validation
      if ($tweetText.length < 6) {
        let alert ='<span><i class="fa-solid fa-circle-radiation"></i>  Please input some text before submitting tweet <i class="fa-solid fa-circle-radiation"></i><span>';
        $("#alert").html(alert);
        $("#alert").slideDown(500);

      } else if($tweetText.length > 146){
        let alert ='<span><i class="fa-solid fa-circle-radiation"></i>  Please limit characters to 140 before submitting tweet <i class="fa-solid fa-circle-radiation"></i></span>';

        $("#alert").html(alert);
        $("#alert").slideDown(500);


      } else {
        $("#alert").html("");
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $tweetText,
          success: loadTweets          
        });

        //clear tweet text input field && reset counter to 140 left
        $("#tweet-text").val("");        
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
        $(".tweet-area").empty();
        $renderTweets(response);
      });
  
    }
    //load all current tweets at time of page load
      loadTweets();
    
});

