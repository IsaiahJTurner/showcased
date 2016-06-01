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
var shareTwitter = function() {
  console.log("memes");
};
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
  if (document.location.search === "?ref=producthunt") {
    $(".ryan-hoover-is-the-best").css("display", "block");
    $(".ryan-hoover-is-the-best").click(function() {
      $(this).css("display", "none");
    })
  }
  var done = false;
  var playing;
  $(this).scroll(function() {
    var animationPoint = $(window).height() > 400 ? 60 : 250;
    if ($(this).scrollTop() >= animationPoint) {
      if (!playing) {
        mixpanel.track("Watch Video");
      }
      playing = true;
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
    mixpanel.track("Sign Up Form Submitted", {
      footer: true
    });
    $("#sign-up-footer").click();
  });
  var validateForm = function(email, isEventOrganizer) {
    if (email.length < 6) {
      var title = "You need to enter an email address!";
      mixpanel.track("Error", {
        title: title
      });
      swal.showInputError(title);
      return false;
    }
    return true;
  };
  var submitForm = function(email, isEventOrganizer, callback) {
    var now = Date.now();
    $.ajax({
      url: firebaseDatabseURL + "/submissions.json",
      type: "POST",
      data: JSON.stringify({
        email: email,
        isEventOrganizer: isEventOrganizer,
        referrer: document.referrer,
        createdAt: now
      }),
      success: function(data) {
        ga('set', 'userId', data.name);
        ga('set', 'email', email);
        ga('set', 'isEventOrganizer', isEventOrganizer);
        mixpanel.alias(data.name);
        mixpanel.people.set({
          "isEventOrganizer": isEventOrganizer,
          "$created": now,
          "$email": email
        });
        mixpanel.track("Signed Up");
        var title = "Thanks for signing up!";
        mixpanel.track("Overlay Opened", {
          title: title
        });
        swal({
          title: title,
          text: 'We’ll get in touch with you as soon as we are ready!<button class="twitter" onclick="shareTwitter()"></button><button class="facebook" onclick="shareFacebook()"></button>',
          type: "success",
          showConfirmButton: false,
          showCancelButton: false,
          html: true
        });
        $(".sweet-overlay").click(function() {
          mixpanel.track("Overlay Closed", {
            title: title
          });
          swal.close();
        });
        $("button.facebook").click(function() {
          mixpanel.track("Shared On Facebook");
          window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A//tryshowcase.com");
        });
        $("button.twitter").click(function() {
          mixpanel.track("Shared On Twitter");
          window.open("https://www.twitter.com/share?u=http%3A//tryshowcase.com&text=Check out Showcase!&via=ShowcaseSupport&hashtags=Showcase");
        });
        callback(false);
      },
      error: function(error) {
        callback(true);
        var title = "Submit failed";
        mixpanel.track("Error", {
          title: title,
          details: error,
          info: "Firebase submit failed"
        });
        swal.showInputError(title);
      }
    });
  }
  $("#sign-up-footer").click(function() {
    mixpanel.track("Sign Up Button Clicked", {
      footer: true
    });
    var email = $("#sign-up-form .email").val();
    var isEventOrganizer = $("#sign-up-form .organizer").is(':checked');
    if (!validateForm(email, isEventOrganizer)) {
      return $("#sign-up").click();
    }
    submitForm(email, isEventOrganizer, function(error) {
      if (error) {
        mixpanel.track("Error", {
          title: error,
          info: "Failed to submit footer form"
        });
        $("#sign-up").click();
      }
    });
  });
  $("#sign-up").click(function() {
    /*jshint multistr: true */
    mixpanel.track("Sign Up Button Clicked");
    var title = "Sign up now to reserve your spot";
    mixpanel.track("Overlay Opened", {
      title: title
    });
    var $swal = swal({
      title: title,
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
      mixpanel.track("Overlay Closed", {
        title: title
      });
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
  var isSecond = true;

  function addImageSet() {
    shuffle(imageIds);
    var $imageSet = $('<div class="image-set" data-id="' + (setsCreated++) + '"></div>');
    setTimeout(function() {
      $imageSet.css({
        transform: "translateY(-" + $imageSet.height() + "px)",
        transition: "transform 90s linear"
      });
    }, 100);
    if (!isSecond) {
      $apps.children().first().remove();
      var $next = $apps.children().first();
      $next.css({
        transform: "none",
        transition: "none"
      });
      setTimeout(function() {
        $next.css({
          transform: "translateY(-" + $imageSet.height() + "px)",
          transition: "transform 90s linear"
        });
      }, 100);
    }
    if (!isFirst) {
      isSecond = false;
    }

    for (var i = 0; i < imageIds.length; i++) {
      var ratio = Math.min(Math.ceil(window.devicePixelRatio), 3);
      var version = ratio > 1 ? "@" + ratio + "x" : "";
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
  setInterval(addImageSet, 90 * 1000);

});
