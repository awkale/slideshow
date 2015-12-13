/* CURRENTLY IN: javascript/main.js */
(function() { // protect
  // your goal:
  // using javascript, wrap the contents
  // of the $slideshow var
  // with:
  // <div class="slideshow__wrapper clearfix">..image divs here..</div>
  var $slideshow = document.querySelector('.slideshow'); // $(".slideshow")
  $slideshow.innerHTML = '<div class="slideshow__wrapper cf">' + $slideshow.innerHTML + '</div>';

  var $slideWrapper = document.querySelector('.slideshow__wrapper');

  // get number of images
  // to get contraint and reset

  var $imgs = document.querySelectorAll('.slideshow__img');
  var imgLen = $imgs.length;

  // width of each image / wrapper
  // to know how far to move

  var $slideshowItem = document.querySelector('.slideshow__item');
  var slideshowItemStyles = getComputedStyle( $slideshowItem );
  var width = slideshowItemStyles.width;
  width = parseInt( width, 10);

  // keep track of current image
  var currImage = 0

  function onInterval() {
    currImage++;
    if ( currImage === imgLen ) {
      currImage = 0;
    }
    $slideWrapper.style.left = -1*currImage*width+'px';
  }
  setInterval(onInterval, 1000);

})();