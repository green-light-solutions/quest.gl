(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    const btnReady = $('#btn-ready');
    const contactForm = $('#contact-form');
    const autoSlide = function() {
      clearTimeout($.fn.fullpage.sliderTimeout);
      $.fn.fullpage.sliderTimeout = setTimeout(() => {
        $.fn.fullpage.moveSlideRight();
      }, 7e3);
    };

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    contactForm.submit(e => {
      e.preventDefault();

      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://api.dev.quest.gl/marketing-data/contacts',
        data: JSON.stringify({ email: contactForm.find('#user-input-email').val() }),
        dataType: 'json',
        success: () => {
          $('#output-message-heading').text('Thank you');
          $('#output-message').text('for submitting your email');
          contactForm.hide();
        },
        error: () => {
          $('#output-message-heading').text('Sorry');
          $('#output-message').text('We encountered some kind of error. Please try again later');
        },
      });
    });

    $('#fullpage').fullpage({
      anchors: [
        'introduction',
        'what-is-quest',
        'why-quest',
        'using-quest',
        'contact',
      ],
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      controlArrows: false,
      paddingTop: '55px',
      onSlideLeave: autoSlide,
      onLeave: (index, nextIndex) => {
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
          logo.addClass('black');
        } else if (nextIndex !== 3) {
          btnReady.addClass('hidden');
        } else if (nextIndex === 3) {
          logo.addClass('white');
          autoSlide();
        }
      },
    });
  });
})();
