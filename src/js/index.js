(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    const btnReady = $('#btn-ready');
    let slideInterval = null;

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    $('#fullpage').fullpage({
      anchors:['hero', 'discover-quest', 'quest-offers', 'using-quest', 'contact'],
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      controlArrows: false,
      onLeave: (index, nextIndex) => {
        clearInterval(slideInterval);
        logo.removeClass();
        btnReady.removeClass();

        if (nextIndex > index) {
          logo.addClass('delay');
          btnReady.addClass('delay');
        }

        if (nextIndex === 1) {
          btnReady.addClass('btn-link');
        } else if (nextIndex === 2 || nextIndex === 4) {
          btnReady.addClass('btn-primary');
        } else if(nextIndex !== 3) {
          btnReady.addClass('hidden');
        }

        if (nextIndex === 3) {
          slideInterval = setInterval(() => {
            $.fn.fullpage.moveSlideRight();
          }, 5e3);
        }

        if (nextIndex === 2 || nextIndex === 4) {
          logo.addClass('black');
        } else if (nextIndex === 3) {
          logo.addClass('white');
        }
      },
    });
  });
})();
