
$(document).ready(function () {

  // 缩放
  function actualResizeHandler() {
    // handle the resize event
    
    var scaleX = window.innerWidth / 750;
    if (scaleX < 1) {
      $('#scaleContainer').css('transform', 'scale(' + scaleX + ')').show();
      $('.button').css({
        'transform': 'scale(' + scaleX + ')'
      });
    } else {
      $('#scaleContainer').show();
      $('.button').css({
        'margin-left': (window.innerWidth - 750) / 2
      });
    }
  }
  actualResizeHandler();

  // resize
  (function() {

    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
       
         // The actualResizeHandler will execute at a rate of 15fps
         }, 66);
      }
    }
  }());

  (function () {
    // nav
    $('#moveNav').html($('#staticNav').html());
    $('body').on('click', '.navTab', function () {
      var type = $(this).data('id');
      highlightNav(type);
    });
    var $navTabs = $('.navTabs');
    var highlightNav = function (type) {
      $navTabs.find('.navTab').removeClass('active');
      $navTabs.find('.navTab.' + type + 'Tab').addClass('active');
      location.href = location.href.split('#')[0] + '#' + type;
    };

    // IntersectionObserver
    var io = new IntersectionObserver(
      function (entries) {
        // console.log(entries.length);
        entries.forEach(function (i) {
          // console.log('Time: ' + i.time);
          // console.log('Target: ' + i.target.id);
          // console.log('IntersectionRatio: ' + i.intersectionRatio);
          // console.log('rootBounds: ' + i.rootBounds);
          // console.log(i.boundingClientRect);
          // console.log(i.intersectionRect);
          // console.log(i.isIntersecting);
          // console.log('================');
          if (i.target.id === 'staticNav') {
            if (i.intersectionRatio >= .99) {
              $('#moveNav').hide();
            } else {
              $('#moveNav').show();
            }
          }
        });
      },
      {
        threshold: [0, .5, .99],
      }
    );
    io.observe(document.querySelector('#staticNav'));

    ['charts', 'news', 'prevent'].forEach(function (d) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (i) {
            if (i.isIntersecting || i.intersectionRatio > 0) {
              highlightNav(d);
            }
          });
        },
        {
          threshold: [0],
          rootMargin: -window.innerHeight / 2.2 + "px 0px"
        }
      );
      io.observe(document.querySelector('#' + d));
    });

    // var io2 = new IntersectionObserver(
    //   function (entries) {
    //     entries.forEach(function (i) {
    //       if (i.isIntersecting || i.intersectionRatio > 0) {
    //         highlightNav('charts');
    //       }
    //     });
    //   },
    //   {
    //     threshold: [0],
    //     rootMargin: -window.innerHeight / 2.2 + "px 0px"
    //   }
    // );
    // io2.observe(document.querySelector('#charts'));


    // var io3 = new IntersectionObserver(
    //   function (entries) {
    //     console.log(entries.length);
    //     entries.forEach(function (i) {
    //       console.log('IntersectionRatio3: ' + i.intersectionRatio);
    //       console.log(i.isIntersecting);
    //       if (i.target.id === 'news') {
    //         if (i.intersectionRatio > 0) {
    //           highlightNav('news');
    //         }
    //       }
    //     });
    //   },
    //   {
    //     threshold: [0],
    //     rootMargin: -window.innerHeight / 2.2 + "px 0px"
    //   }
    // );
    // io3.observe(document.querySelector('#news'));

    // var io4 = new IntersectionObserver(
    //   function (entries) {
    //     console.log(entries.length);
    //     entries.forEach(function (i) {
    //       console.log('IntersectionRatio4: ' + i.intersectionRatio);
    //       console.log(i.isIntersecting);
    //       if (i.target.id === 'prevent') {
    //         if (i.intersectionRatio > 0) {
    //           highlightNav('prevent');
    //         }
    //       }
    //     });
    //   },
    //   {
    //     threshold: [0],
    //     rootMargin: -window.innerHeight / 2.2 + "px 0px"
    //   }
    // );
    // io4.observe(document.querySelector('#prevent'));

  }());



});









