define('views/home', [
    'services/contact-service'
  ], function(contactService){

    var _public = {};
    var topbarElement,
      primaryMenuItemsElement,
      contactFormElement,
      contactAlertElement,
      homeIntroSecondaryButton;


    _public.init = function(){
      bindElements();
    };

    function bindElements(){
      topbarElement = $('[data-js=topbar]');
      primaryMenuItemsElement = $('a, [data-js=primary-menu]');
      homeIntroSecondaryButton = $('[data-js="home-intro-secondary-button"]')
      contactAlertElement = $('[data-js=contact-form-alert]');
      contactFormElement = $('[data-js=contact-form]');

      primaryMenuItemsElement.on('click', onPrimaryMenuItemClick);
      homeIntroSecondaryButton.on('click', onHomeIntroSecondaryButtonClick)
      contactFormElement.on('submit', onContactFormSubmit);
    }

    function onPrimaryMenuItemClick(evt){
      var section = $(evt.currentTarget).attr('data-menu-item-section');
      if(section)
        goToSection(section);
    }

    function onHomeIntroSecondaryButtonClick(){
      goToSection('benefits');
    }

    function goToSection(section){
      var sectionOffset = $('[data-js=section-' + section + ']').offset();
      $('html, body').animate({
        scrollTop: sectionOffset.top - topbarElement.outerHeight()
      }, 1000, 'swing');
    }

    function onContactFormSubmit(evt){
      evt.preventDefault();
      clearAlert();
      contactFormElement.addClass('form-sending');

      contactService.send({
        name: getContactData('name'),
        email: getContactData('email'),
        message: getContactData('message')
      }).then(onSendSuccess ,onSendError);
    }

    function getContactData(data){
      return getContactField(data).val();
    }

    function resetContactFormField(field){
      return getContactField(field).val('');
    }

    function getContactField(field){
      return $('[data-js=contact-' + field + ']');
    }

    function onSendSuccess(){
      onSendComplete();
      resetContactFormField('name');
      resetContactFormField('email');
      resetContactFormField('message');
      setAlert('success', 'Success! You\'ll get a reply soon.');
    }

    function onSendError(){
      onSendComplete();
      setAlert('error', 'Ops! We got some error. Please, try again.');
    }

    function onSendComplete(){
      contactFormElement.removeClass('form-sending');
    }

    function clearAlert(){
      setAlert(null, '');
    }

    function setAlert(alertType, alertMessage){
      alertElement.removeClass('alert-hidden alert-error alert-success');

      if(alertType)
        alertElement.addClass('alert-'+alertType)
      else
        alertElement.addClass('alert-hidden')

      alertElement.text(alertMessage);
    }

    return _public;

});
