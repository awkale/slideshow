/* CURRENTLY IN: javascript/main.js */
(function() { // protect
  var _SlideConfigs = {
    innerWrapper: '.slideshow__wrapper',
    slideItem: '.slideshow__item',
    getInnerWrapperAsHTML: function( innerHTML ) {
      var innerWrapperStart = '<div class="slideshow__wrapper cf">';
      var innerWrapperEnd = '</div>';

      return innerWrapperStart + innerHTML + innerWrapperEnd;
    }
  };

  var $ = function( val ) {
    return document.querySelector( val );
  };
  var $All = function( val ) {
    return document.querySelectorAll( val );
  }

  function getWidth( $slideshowItem ) {
    var slideshowItemStyles = getComputedStyle( $slideshowItem );
    var width = slideshowItemStyles.width;
    return parseInt( width, 10 );
  }

  function SlideShow(slideClass) {
    this.$slideshow = $(slideClass);
    this.$slideshow.innerHTML = _SlideConfigs.getInnerWrapperAsHTML(
      this.$slideshow.innerHTML
      );

    this.$slideWrapper = $(slideClass + ' ' + _SlideConfigs.innerWrapper);
    this.$slideshowItem = $(slideClass + ' ' + _SlideConfigs.slideItem);
    this.slideLen = $All(slideClass + ' ' + _SlideConfigs.slideItem).length;

    this.currImage = 0;

    this.width = getWidth( this.$slideshowItem );

    this.setSlideWrapperWidth();

    this.tick();

  } // constructor

  SlideShow.prototype.setSlideWrapperWidth = function() {
    this.$slideWrapper.style.width = this.slideLen * this.width + 'px';
  }

  SlideShow.prototype.tick = function() {
    this.interval = setInterval(function() {
      this.currImage++;
      if ( this.currImage === this.slideLen ) {
        this.currImage = 0;
      }

      this.$slideWrapper.style.left = -1*this.currImage*this.width+'px';

    }.bind( this ), 1000);
  }

  SlideShow.prototype.pause = function() {
    clearInterval( this.interval );
  }

  function initSlideshows( slideClass ) {
    var slideshows = document.querySelectorAll(slideClass);
    var slideshowInstances = [];
    for( var i = 0; i < slideshows.length; ++i ) {
      slideshows[ i ].classList.add('slideshow-'+i);
      new SlideShow( '.slideshow-'+i );
    }
  }

  initSlideshows('.slideshow');

})();