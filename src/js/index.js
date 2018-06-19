(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    const btnReady = $('#btn-ready');
    const contactForm = $('#contact-form');
    const navbar = $('nav');

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    contactForm.submit(e => {
      e.preventDefault();
      window.gtag('event', 'submit', {'event_category': 'signup' });

      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://api.dev.quest.gl/marketing-data/contacts',
        data: JSON.stringify({ email: contactForm.find('#user-input-email').val() }),
        dataType: 'json',
        success: () => {
          $('#output-message-heading').text('We appreciate your interest in Quest');
          $('#output-message').text('Our team will be in touch with you soon to schedule a demo.');
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
        'how-it-works',
        'why-quest',
        'contact',
      ],
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      controlArrows: false,
      paddingTop: '55px',
      responsiveWidth: 768,
      onLeave: (index, nextIndex) => {
        logo.removeClass();
        btnReady.removeClass();
        navbar.removeClass();

        if (nextIndex > index) {
          logo.addClass('delay');
          btnReady.addClass('delay');
        }

        if (nextIndex === 1) {
          btnReady.addClass('btn-primary');
          logo.addClass('hidden');
          navbar.addClass('hidden');
        } else if (nextIndex === 2 || nextIndex === 4) {
          btnReady.addClass('btn-primary');
          logo.addClass('black');
        } else if (nextIndex !== 3) {
          navbar.addClass('hidden');
          btnReady.addClass('hidden');
        } else if (nextIndex === 3) {
          logo.addClass('white');
          window.gtag('event', 'video', {'event_category': 'play' });
        }
      },
    });
  });
})();
