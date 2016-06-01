function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
jQuery.fn.extend({
  lazyload: function() {
    var $this = this;
    $this.css('opacity', '0');
    $.get($this.attr("data-original"), function(data) {
      setTimeout(function() {
        $this.attr('src', $this.attr("data-original")).animate({
          opacity: 1
        }, 1000);
      }, Math.floor(Math.random() * 3000));
    });
    return $this;
  }
});
$(document).ready(function() {
  swal({
    title: "Thanks for signing up!",
    text: 'We’ll get in touch with you as soon as we are ready!<button class="twitter" onclick="shareTwitter()"></button><button class="facebook" onclick="shareFacebook()"></button>',
    type: "success",
    showConfirmButton: false,
    showCancelButton: false,
    html: true
  });
  $(".sweet-overlay").click(function() {
    swal.close();
  });
  var done = false;
  $(this).scroll(function() {
    var animationPoint = $(window).height() > 400 ? 60 : 250;
    console.log(animationPoint)
    if ($(this).scrollTop() >= animationPoint) {
      $(".video").children(".phone.iphone, .phone.nexus").addClass("animateIn");
    } else {
      $(".video").children(".phone.iphone, .phone.nexus").removeClass("animateIn");
    }
  });
  $('.slider').unslider({
    nav: false,
    keys: false,
    autoplay: true,
    speed: 500,
    delay: 4000,
    arrows: false,
    infinite: true
  });
  $("#sign-up-form").submit(function() {
    $("#sign-up-footer").click();
  });
  var validateForm = function(email, isEventOrganizer) {
    if (email.length < 6) {
      swal.showInputError("You need to enter an email address!");
      return false;
    }
    return true;
  };
  var submitForm = function(email, isEventOrganizer, callback) {
    $.ajax({
      url: firebaseDatabseURL + "/submissions.json",
      type: "POST",
      data: JSON.stringify({
        email: email,
        isEventOrganizer: isEventOrganizer,
        createdAt: Date.now()
      }),
      success: function() {
        swal({
          title: "Thanks for signing up!",
          text: 'We’ll get in touch with you as soon as we are ready!<button class="twitter" onclick="shareTwitter()"></button><button class="facebook" onclick="shareFacebook()"></button>',
          type: "success",
          showConfirmButton: false,
          showCancelButton: false,
          html: true
        });
        $(".sweet-overlay").click(function() {
          swal.close();
        });
        callback(false);
      },
      error: function(error) {
        callback(true);
        swal.showInputError("Submit failed");
      }
    });
  }
  $("#sign-up-footer").click(function() {
    var email = $("#sign-up-form .email").val();
    var isEventOrganizer = $("#sign-up-form .organizer").is(':checked');
    if (!validateForm(email, isEventOrganizer)) {
      return $("#sign-up").click();
    }
    submitForm(email, isEventOrganizer, function(error) {
      if (error) {
        $("#sign-up").click();
      }
    });
  });
  $("#sign-up").click(function() {
    /*jshint multistr: true */

    var $swal = swal({
      title: "Sign up now to reserve your spot",
      text: $("#sign-up-form").html(),
      showCancelButton: false,
      closeOnConfirm: false,
      confirmButtonText: "Sign Up",
      html: true
    }, function(submit) {
      if (!submit) {
        return;
      }
      var email = $(".sweet-alert .email").val();
      var isEventOrganizer = $(".sweet-alert .organizer").is(':checked');
      if (!validateForm(email, isEventOrganizer)) {
        return;
      };
      submitForm(email, isEventOrganizer);
    });
    $(".sweet-alert .email").focus();
    $(".sweet-overlay").click(function() {
      swal.close();
    });
  });

  var $apps = $(".apps");
  var imageIds = [];
  for (var i = 1; i <= 50; i++) {
    imageIds.push(i);
  }
  var setsCreated = 0;

  var imageCount;
  var isFirst = true;

  function addImageSet() {
    shuffle(imageIds);
    var $imageSet = $('<div class="image-set" data-id="' + (setsCreated++) + '"></div>');
    setTimeout(function() {
      $imageSet.css({
        transform: "translateZ(0px) translateY(-3210px)",
        transition: "transform 750s linear"
      });
    }, 100);
    for (var i = 0; i < imageIds.length; i++) {
      var version = window.devicePixelRatio > 1 ? "@" + window.devicePixelRatio + "x" : "";
      var event = "image-" + (imageCount++);
      var $image = $('<img data-original="img/cards/' + imageIds[i] + version + '.png" />');
      if (isFirst) {
        $image.lazyload();
      } else {
        $image.attr("src", $image.attr("data-original"));
      }
      $imageSet.append($image);
    }
    isFirst = false;
    $apps.append($imageSet);
    return $imageSet;
  }
  addImageSet();
  addImageSet();
  setInterval(addImageSet, 1500 * 1000);

});
