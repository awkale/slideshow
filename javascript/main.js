/* CURRENTLY IN: javascript/main.js */
(function() { // protect
  // your goal:
  // using javascript, wrap the contents
  // of the $slideshow var
  // with:
  // <div class="slideshow__wrapper clearfix">..image divs here..</div>
  var $slideshow = document.querySelector('.slideshow'); // $(".slideshow")
  $slideshow.innerHTML = '<div class="slideshow__wrapper cf">' + $slideshow.innerHTML + '</div>';



})();