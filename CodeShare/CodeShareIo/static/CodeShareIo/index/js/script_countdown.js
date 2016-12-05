/* Main js - Nom Comming Soon Template */
var site_launch_date = '2017/05/20 14:05';

(function ($) {

  $(document).ready(function () {
    "use strict";

    /* Countdown */

    if ($('#countdown').length > 0) {
      $('#countdown').countdown({
        until: new Date(site_launch_date),
        layout: '<div class="countdown-section"><div class="countdown-amount">{dn}</div><span class="countdown-period">{dl}</span></div>'
        + '<div class="countdown-section"><div class="countdown-amount">{hnn}</div><span class="countdown-period">{hl}</span></div>'
        + '<div class="countdown-section"><div class="countdown-amount">{mnn}</div><span class="countdown-period">{ml}</span></div>'
        + '<div class="countdown-section secs"><div class="countdown-amount">{snn}</div><span class="countdown-period">{sl}</span></div>'
      });
    }

  });

  function isMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

})(jQuery);
