$(document).ready(() => {

  //on type, update remaining char count
  $("#tweet-text").on('input', function() {

    let text = $(this).val();
    length = 140 - text.length;

    //target the counter element inside the new-tweet parent
    let counter = $('.new-tweet').find('output[name="counter"]');

    //change class and colour if negative, return to normal if not
    if (length < 0) {
      $(counter).removeClass("counter");
      $(counter).addClass("negative");
    

    } else {
      $(counter).removeClass("negative");
      $(counter).addClass("counter");
    

    }

    $(counter).text(length);



  });

});

