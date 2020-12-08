$( document ).ready(function() {

  var $sticky = $('.sidebar');
  var $stickyrStopper = $('.footer');
  if (!!$sticky.offset()) {

    var generalSidebarHeight = $sticky.innerHeight();
    var stickyTop = $sticky.offset().top;
    var stickOffset = 40;
    var stickyStopperPosition = $stickyrStopper.offset().top;
    var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    var diff = stopPoint + stickOffset;

    $(window).scroll(function(){
      var windowTop = $(window).scrollTop();
      var stickyStopperPosition = $stickyrStopper.offset().bottom;
      var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
      var diff = stopPoint + stickOffset;

      if (stopPoint < windowTop) {
          $sticky.css({ position: 'relative', top: '10px', marginBottom: '150px' });
          $('.sidebrand').css({ display: 'none', })
      } else if (stickyTop < windowTop+stickOffset) {
          $sticky.css({ position: 'sticky', top: stickOffset, marginBottom: '150px' });
          $('.sidebrand').css({ display: 'block' })
      } else {
          $sticky.css({ position: 'relative', top: '10px' });
          $('.sidebrand').css({ display: 'none', })
      }
    });
  }
});
