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
$(document).ready(function() {

    $('.slider').unslider({
      nav: false,
      keys: false,
      autoplay: true,
      speed: 500,
      delay: 4000,
      arrows: false,
      infinite: true
    });


    var $apps = $(".apps");
    var imageIds = [];
    for (var i = 1; i <= 50; i++) {
        imageIds.push(i);
    }
    var setsCreated = 0;

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
            $imageSet.append("<img src='img/cards/" + imageIds[i] + version + ".png' />");
        }
        $apps.append($imageSet);
        return $imageSet;
    }
    addImageSet();
    setInterval(addImageSet, 1500 * 1000);

});
