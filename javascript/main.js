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

  function SlideShow( slideClass, opts ) {
    if ( opts && opts.timeoutTime ) {
      this.timeout = opts.timeoutTime;
    }
    else {
      this.timeout = 1000;
    }

    if ( opts && opts.onSlideAfter ) {
      this.onSlideAfter = opts.onSlideAfter;
    }

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

    this.bindEvents();

    } // constructor

    SlideShow.prototype.bindEvents = function() {
      this.$slideshow.addEventListener('mouseenter', function() {
        this.pause();
      }.bind(this));
      this.$slideshow.addEventListener('mouseleave', function() {
        this.tick();
      }.bind(this));
    }

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
        if ( this.onSlideAfter ) {
          this.onSlideAfter( this.currImage );
        }
      }.bind( this ), this.timeout);
    }

    SlideShow.prototype.start = function() {
      this.tick();
    }

    SlideShow.prototype.pause = function() {
      clearInterval( this.interval );
    }

    var s = new SlideShow( '.slideshow', {
      onSlideAfter: function( currentImage ) {
        console.log('hello, wrold!', currentImage );
      }
    });

    $('.js-pause').addEventListener('click', function() {
      s.pause();
    })

    $('.js-start').addEventListener('click', function() {
      s.start();
    })

  })();