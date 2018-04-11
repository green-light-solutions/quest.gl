(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    const btnReady = $('#btn-ready');
    let slideInterval = null;

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    $('#contact-form').submit(e => {
      e.preventDefault();

      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://api.dev.quest.gl/marketing-data/contacts',
        data: JSON.stringify({ email: $('#user-input-email').val() }),
        dataType: 'json',
        success: () => {
          $('#output-message-heading').text('Thank you');
          $('#output-message').text('for submitting your email');
          $('#contact-form').hide();
        },
        error: () => {
          $('#output-message-heading').text('Sorry');
          $('#output-message').text('We encountered some kind of error. Please try again later');
        },
      });
    });

    $('#fullpage').fullpage({
      anchors:['hero', 'discover-quest', 'quest-offers', 'using-quest', 'contact'],
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      controlArrows: false,
      paddingTop: '55px',
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
        } else if (nextIndex !== 3) {
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
