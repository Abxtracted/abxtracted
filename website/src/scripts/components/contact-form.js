define('components/contactForm', [
    'jquery',
    'services/contactService'
  ], function($, contactService){

    var CONTACT_FORM_SENDING_CSS_CLASS = 'form-sending';
    var CONTACT_FORM_SUCCESS_MESSAGE = 'Success! You\'ll get a reply soon.';
    var CONTACT_FORM_ERROR_MESSAGE = 'Ops! We got some error. Please, try again.';

    var _public = {};
    var contactFormAlertElement, contactFormElement;

    _public.init = function(){
      bindElements();
    }

    function bindElements(){
      contactFormAlertElement = $('[data-js=contact-form-alert]');
      contactFormElement = $('[data-js="contact-form"]');

      contactFormElement.on('submit', onContactFormSubmit)
    }

    function onContactFormSubmit(evt){
      evt.preventDefault();
      clearAlert();
      contactFormElement.addClass(CONTACT_FORM_SENDING_CSS_CLASS);

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
      setContactFormAlert('success', CONTACT_FORM_SUCCESS_MESSAGE);
    }

    function onSendError(){
      onSendComplete();
      setContactFormAlert('error', CONTACT_FORM_ERROR_MESSAGE);
    }

    function onSendComplete(){
      contactFormElement.removeClass(CONTACT_FORM_SENDING_CSS_CLASS);
    }

    function clearAlert(){
      setContactFormAlert(null, '');
    }

    function setContactFormAlert(alertType, alertMessage){
      contactFormAlertElement.removeClass('alert-hidden alert-error alert-success');

      if(alertType)
        contactFormAlertElement.addClass(['alert',alertType].join('-'));
      else
        contactFormAlertElement.addClass('alert-hidden');

      contactFormAlertElement.text(alertMessage);
    }

    return _public;

});
