(function() {
  $(function() {
    var checkForCapsLock, domains, loginAttempts, secondLevelDomains, topLevelDomains, unmaskPassword;
    /*------------------------------------------
     * Functions
    ------------------------------------------ */

    // Handles unmasking and masking a password
    // field by toggling the "type" attribute
    // from password to text and vice versa.
    unmaskPassword = function(target) {
      var state;
      state = $(target).attr("type");
      if (state === "password") {
        return $(target).attr("type", "text");
      } else {
        return $(target).attr("type", "password");
      }
    };
    
    // Handles checking if Caps Lock is on and
    // displays a warning message if it is.
    checkForCapsLock = function(event) {
      var s;
      s = String.fromCharCode(event.keyCode || event.which);
      if (s.toUpperCase() === s && !event.shiftKey) {
        return $('.c-card__feedback').addClass('is--in is--warning').html("Your Caps Lock is on. Is that right?");
      } else {
        return $('.c-card__feedback').removeClass('is--in');
      }
    };
    /*------------------------------------------
     * Actions
    ------------------------------------------ */

    // Handles unmasking and masking a given password
    // field.
    $('[data-onCheck="unmaskPassword"]').change(function() {
      var target;
      target = $(this).attr("data-target");
      return unmaskPassword($(`[name='${target}']`));
    });
    /*------------------------------------------
     * Initialization
    ------------------------------------------ */

    // Handles whatever needs to go on when the
    // form submits.
    loginAttempts = 0;
    
    // We also need to check for common email
    // mistakes. Thanks to Mailcheck.js this
    // is pretty easy
    domains = ['gmail.com', 'aol.com', 'live.com', 'wayne.com'];
    secondLevelDomains = ['hotmail'];
    topLevelDomains = ["com", "net", "org"];
    $('#emailField').on('change', function() {
      return $(this).mailcheck({
        domains: domains,
        secondLevelDomains: secondLevelDomains,
        topLevelDomains: topLevelDomains,
        suggested: function(element, suggestion) {
          return $('.c-card__feedback').addClass('is--in is--warning').html(`Did you mean ${suggestion.full}?`);
        },
        empty: function(element) {
          return $('.c-card__feedback').removeClass('is--in');
        }
      });
    });
    $('.has--validator').validate({
      errorClass: "c-feedback-cube__feedback__item is--invalid",
      validClass: "c-feedback-cube__feedback__item is--valid",
      errorElement: "div",
      wrapper: "div",
      errorPlacement: function(label, element) {
        $(element).parent().find('.c-feedback-cube__feedback').remove();
        element.addClass('has--feedback');
        label.addClass('c-feedback-cube__feedback');
        return label.insertAfter($(element).parent().find('.c-feedback-cube'));
      },
      success: function(label, element) {
        $(element).parent().find('.c-feedback-cube__feedback').remove();
        $(element).addClass('has--feedback');
        label.removeClass('is--invalid');
        return label.addClass('is--valid');
      }
    });
    
    // Whenever a change happens within the form
    // check if it's valid and set the disabled
    // state on the submit button accordingly.
    $('.has--validator').on("change", "input", function() {
      if ($('.has--validator').valid() && loginAttempts <= 3) {
        return $('.has--validator').find('[type="submit"]').removeAttr("disabled");
      }
      return $('.has--validator').find('[type="submit"]').attr("disabled", "disabled");
    });
    
    // Also gotta check for Caps Lock
    $(document).on("capsOn", function(event) {
      return $('.c-card__feedback').addClass('is--in is--warning').html("Your Caps Lock is on. Is that right?");
    });
    $(document).on("capsOff", function(event) {
      return $('.c-card__feedback').removeClass('is--in');
    });
    $(document).capslockstate();
    // Show the "Show Password" checkbox when the user
    // first focuses in on it
    $('#passwordField').on("focus", function() {
      return $('#checkboxContainer').removeClass('is--hidden');
    });
    $('#passwordField').on("keyup", function() {
      if ($(this).valid() && loginAttempts <= 3) {
        return $('.has--validator').find('[type="submit"]').removeAttr("disabled");
      }
      return $('.has--validator').find('[type="submit"]').attr("disabled", "disabled");
    });
    $('input[type="email"]').on("change", function() {
      if ($(this).val() === 'bruce@wayne.com') {
        return $(this).next('.c-feedback-cube').addClass('show--bruce');
      } else {
        return $(this).next('.c-feedback-cube').removeClass('show--bruce');
      }
    });
    $(document).on("submit", 'form', function() {
      return loginAttempts++;
    });
    return $('.has--validator').submit(function(event) {
      var cardFeedbackField, passwordField, submitBtnDefaultText, submitBtnwaitingText;
      event.preventDefault();
      cardFeedbackField = $('.c-card__feedback');
      submitBtnDefaultText = $(this).find('[type="submit"]').val();
      submitBtnwaitingText = $(this).find('[type="submit"]').attr("data-waiting-text");
      passwordField = $('#passwordField');
      $(this).find('[type="submit"]').val(submitBtnwaitingText).addClass('is--unclickable');
      
      // Reset the submit button text after a short
      // period of time.
      return setTimeout(() => {
        
        // Fake a login situation that can fail and
        // be successful by entering "batcave" as
        // the password
        if (passwordField.val() === 'batcave') {
          $(document).find('.c-card').toggleClass('is--signing-in');
          return $(document).find('.c-card__title').attr("data-subtitle", "Sign in successful").text('Stay sharp today!');
        } else {
          cardFeedbackField.removeClass('is--in is--invalid is--valid is--warning');
          cardFeedbackField.addClass('is--in is--invalid').text('Not the right password, buddy. Try again.');
          if (loginAttempts >= 1) {
            $(document).find('[data-show-after-first-attempt]').removeClass('is--hidden');
          }
          if (loginAttempts >= 3) {
            $('.has--validator').find('[type="submit"]').attr("disabled", "disabled");
            cardFeedbackField.addClass('is--in').text('Too many tries, dude. Come back in 10 minutes.');
          }
          $(this).find('[type="submit"]').val(submitBtnDefaultText).removeClass('is--unclickable');
          return setTimeout(() => {
            return cardFeedbackField.removeClass('is--in');
          }, 5000);
        }
      }, 2000);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBQSxDQUFBLENBQUE7QUFTQSxRQUFBLGdCQUFBLEVBQUEsT0FBQSxFQUFBLGFBQUEsRUFBQSxrQkFBQSxFQUFBLGVBQUEsRUFBQSxjQUFBOzs7Ozs7OztJQUFBLGNBQUEsR0FBaUIsUUFBQSxDQUFDLE1BQUQsQ0FBQTtBQUNmLFVBQUE7TUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO01BRVIsSUFBRyxLQUFBLEtBQVMsVUFBWjtlQUNFLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsTUFBZixFQUF1QixNQUF2QixFQURGO09BQUEsTUFBQTtlQUdFLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsTUFBZixFQUF1QixVQUF2QixFQUhGOztJQUhlLEVBQWpCOzs7O0lBVUEsZ0JBQUEsR0FBbUIsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUNqQixVQUFBO01BQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxZQUFQLENBQXFCLEtBQUssQ0FBQyxPQUFOLElBQWlCLEtBQUssQ0FBQyxLQUE1QztNQUVKLElBQUcsQ0FBQyxDQUFDLFdBQUYsQ0FBQSxDQUFBLEtBQW1CLENBQW5CLElBQXlCLENBQUMsS0FBSyxDQUFDLFFBQW5DO2VBQ0UsQ0FBQSxDQUFFLG1CQUFGLENBQXNCLENBQUMsUUFBdkIsQ0FBZ0Msb0JBQWhDLENBQXFELENBQUMsSUFBdEQsQ0FBMkQsc0NBQTNELEVBREY7T0FBQSxNQUFBO2VBR0UsQ0FBQSxDQUFFLG1CQUFGLENBQXNCLENBQUMsV0FBdkIsQ0FBbUMsUUFBbkMsRUFIRjs7SUFIaUIsRUFWbkI7Ozs7Ozs7SUF3QkEsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsTUFBckMsQ0FBNEMsUUFBQSxDQUFBLENBQUE7QUFD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SUFkMEIsQ0FBNUI7RUF2SEEsQ0FBRjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJCAtPlxuICBcbiAgIyMjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICMgRnVuY3Rpb25zXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSMjI1xuICBcbiAgIyBIYW5kbGVzIHVubWFza2luZyBhbmQgbWFza2luZyBhIHBhc3N3b3JkXG4gICMgZmllbGQgYnkgdG9nZ2xpbmcgdGhlIFwidHlwZVwiIGF0dHJpYnV0ZVxuICAjIGZyb20gcGFzc3dvcmQgdG8gdGV4dCBhbmQgdmljZSB2ZXJzYS5cbiAgdW5tYXNrUGFzc3dvcmQgPSAodGFyZ2V0KSAtPlxuICAgIHN0YXRlID0gJCh0YXJnZXQpLmF0dHIgXCJ0eXBlXCJcbiAgICBcbiAgICBpZiBzdGF0ZSBpcyBcInBhc3N3b3JkXCJcbiAgICAgICQodGFyZ2V0KS5hdHRyIFwidHlwZVwiLCBcInRleHRcIlxuICAgIGVsc2VcbiAgICAgICQodGFyZ2V0KS5hdHRyIFwidHlwZVwiLCBcInBhc3N3b3JkXCJcbiAgXG4gICMgSGFuZGxlcyBjaGVja2luZyBpZiBDYXBzIExvY2sgaXMgb24gYW5kXG4gICMgZGlzcGxheXMgYSB3YXJuaW5nIG1lc3NhZ2UgaWYgaXQgaXMuXG4gIGNoZWNrRm9yQ2Fwc0xvY2sgPSAoZXZlbnQpIC0+XG4gICAgcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2ggKVxuICAgIFxuICAgIGlmIHMudG9VcHBlckNhc2UoKSBpcyBzIGFuZCAhZXZlbnQuc2hpZnRLZXlcbiAgICAgICQoJy5jLWNhcmRfX2ZlZWRiYWNrJykuYWRkQ2xhc3MoJ2lzLS1pbiBpcy0td2FybmluZycpLmh0bWwoXCJZb3VyIENhcHMgTG9jayBpcyBvbi4gSXMgdGhhdCByaWdodD9cIilcbiAgICBlbHNlXG4gICAgICAkKCcuYy1jYXJkX19mZWVkYmFjaycpLnJlbW92ZUNsYXNzKCdpcy0taW4nKSAgICBcbiAgXG4gICMjIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAjIEFjdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIyMjXG4gIFxuICAjIEhhbmRsZXMgdW5tYXNraW5nIGFuZCBtYXNraW5nIGEgZ2l2ZW4gcGFzc3dvcmRcbiAgIyBmaWVsZC5cbiAgJCgnW2RhdGEtb25DaGVjaz1cInVubWFza1Bhc3N3b3JkXCJdJykuY2hhbmdlKCgpLT5cbiAgICB0YXJnZXQgPSAkKHRoaXMpLmF0dHIgXCJkYXRhLXRhcmdldFwiXG4gICAgdW5tYXNrUGFzc3dvcmQoJChcIltuYW1lPScje3RhcmdldH0nXVwiKSlcbiAgKVxuXG5cbiAgIyMjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICMgSW5pdGlhbGl6YXRpb25cbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIyMjXG4gIFxuICAjIEhhbmRsZXMgd2hhdGV2ZXIgbmVlZHMgdG8gZ28gb24gd2hlbiB0aGVcbiAgIyBmb3JtIHN1Ym1pdHMuXG4gIGxvZ2luQXR0ZW1wdHMgPSAwXG4gIFxuICAjIFdlIGFsc28gbmVlZCB0byBjaGVjayBmb3IgY29tbW9uIGVtYWlsXG4gICMgbWlzdGFrZXMuIFRoYW5rcyB0byBNYWlsY2hlY2suanMgdGhpc1xuICAjIGlzIHByZXR0eSBlYXN5XG4gIGRvbWFpbnMgICAgICAgICAgICAgPSBbJ2dtYWlsLmNvbScsICdhb2wuY29tJywgJ2xpdmUuY29tJywgJ3dheW5lLmNvbSddXG4gIHNlY29uZExldmVsRG9tYWlucyAgPSBbJ2hvdG1haWwnXVxuICB0b3BMZXZlbERvbWFpbnMgICAgID0gW1wiY29tXCIsIFwibmV0XCIsIFwib3JnXCJdXG5cbiAgJCgnI2VtYWlsRmllbGQnKS5vbiAnY2hhbmdlJywgKCkgLT5cbiAgICAkKHRoaXMpLm1haWxjaGVja1xuICAgICAgZG9tYWluczogZG9tYWluc1xuICAgICAgc2Vjb25kTGV2ZWxEb21haW5zOiBzZWNvbmRMZXZlbERvbWFpbnNcbiAgICAgIHRvcExldmVsRG9tYWluczogdG9wTGV2ZWxEb21haW5zXG4gICAgICBzdWdnZXN0ZWQ6IChlbGVtZW50LCBzdWdnZXN0aW9uKSAtPlxuICAgICAgICAkKCcuYy1jYXJkX19mZWVkYmFjaycpLmFkZENsYXNzKCdpcy0taW4gaXMtLXdhcm5pbmcnKS5odG1sKFwiRGlkIHlvdSBtZWFuICN7c3VnZ2VzdGlvbi5mdWxsfT9cIilcbiAgICAgIGVtcHR5OiAoZWxlbWVudCkgLT5cbiAgICAgICAgJCgnLmMtY2FyZF9fZmVlZGJhY2snKS5yZW1vdmVDbGFzcygnaXMtLWluJylcbiAgXG4gICQoJy5oYXMtLXZhbGlkYXRvcicpLnZhbGlkYXRlXG4gICAgZXJyb3JDbGFzczogXCJjLWZlZWRiYWNrLWN1YmVfX2ZlZWRiYWNrX19pdGVtIGlzLS1pbnZhbGlkXCJcbiAgICB2YWxpZENsYXNzOiBcImMtZmVlZGJhY2stY3ViZV9fZmVlZGJhY2tfX2l0ZW0gaXMtLXZhbGlkXCJcbiAgICBlcnJvckVsZW1lbnQ6IFwiZGl2XCJcbiAgICB3cmFwcGVyOiBcImRpdlwiXG4gICAgZXJyb3JQbGFjZW1lbnQ6IChsYWJlbCwgZWxlbWVudCkgLT5cbiAgICAgICQoZWxlbWVudCkucGFyZW50KCkuZmluZCgnLmMtZmVlZGJhY2stY3ViZV9fZmVlZGJhY2snKS5yZW1vdmUoKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyAnaGFzLS1mZWVkYmFjaydcbiAgICAgIGxhYmVsLmFkZENsYXNzICdjLWZlZWRiYWNrLWN1YmVfX2ZlZWRiYWNrJ1xuICAgICAgbGFiZWwuaW5zZXJ0QWZ0ZXIgJChlbGVtZW50KS5wYXJlbnQoKS5maW5kKCcuYy1mZWVkYmFjay1jdWJlJylcbiAgICBzdWNjZXNzOiAobGFiZWwsIGVsZW1lbnQpIC0+XG4gICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLmZpbmQoJy5jLWZlZWRiYWNrLWN1YmVfX2ZlZWRiYWNrJykucmVtb3ZlKClcbiAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MgJ2hhcy0tZmVlZGJhY2snXG4gICAgICBsYWJlbC5yZW1vdmVDbGFzcyAnaXMtLWludmFsaWQnXG4gICAgICBsYWJlbC5hZGRDbGFzcyAnaXMtLXZhbGlkJ1xuICBcbiAgIyBXaGVuZXZlciBhIGNoYW5nZSBoYXBwZW5zIHdpdGhpbiB0aGUgZm9ybVxuICAjIGNoZWNrIGlmIGl0J3MgdmFsaWQgYW5kIHNldCB0aGUgZGlzYWJsZWRcbiAgIyBzdGF0ZSBvbiB0aGUgc3VibWl0IGJ1dHRvbiBhY2NvcmRpbmdseS5cbiAgJCgnLmhhcy0tdmFsaWRhdG9yJykub24gXCJjaGFuZ2VcIiwgXCJpbnB1dFwiLCAoKSAtPlxuICAgIGlmICQoJy5oYXMtLXZhbGlkYXRvcicpLnZhbGlkKCkgYW5kIGxvZ2luQXR0ZW1wdHMgPD0gM1xuICAgICAgcmV0dXJuICQoJy5oYXMtLXZhbGlkYXRvcicpLmZpbmQoJ1t0eXBlPVwic3VibWl0XCJdJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpXG4gICAgcmV0dXJuICQoJy5oYXMtLXZhbGlkYXRvcicpLmZpbmQoJ1t0eXBlPVwic3VibWl0XCJdJykuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIilcblxuICBcbiAgIyBBbHNvIGdvdHRhIGNoZWNrIGZvciBDYXBzIExvY2tcbiAgJChkb2N1bWVudCkub24gXCJjYXBzT25cIiwgKGV2ZW50KSAtPlxuICAgICQoJy5jLWNhcmRfX2ZlZWRiYWNrJykuYWRkQ2xhc3MoJ2lzLS1pbiBpcy0td2FybmluZycpLmh0bWwoXCJZb3VyIENhcHMgTG9jayBpcyBvbi4gSXMgdGhhdCByaWdodD9cIilcbiAgJChkb2N1bWVudCkub24gXCJjYXBzT2ZmXCIsIChldmVudCkgLT5cbiAgICAkKCcuYy1jYXJkX19mZWVkYmFjaycpLnJlbW92ZUNsYXNzKCdpcy0taW4nKSBcbiAgICBcbiAgICBcbiAgICBcbiAgJChkb2N1bWVudCkuY2Fwc2xvY2tzdGF0ZSgpXG5cbiAgIyBTaG93IHRoZSBcIlNob3cgUGFzc3dvcmRcIiBjaGVja2JveCB3aGVuIHRoZSB1c2VyXG4gICMgZmlyc3QgZm9jdXNlcyBpbiBvbiBpdFxuICAkKCcjcGFzc3dvcmRGaWVsZCcpLm9uIFwiZm9jdXNcIiwgKCkgLT5cbiAgICAkKCcjY2hlY2tib3hDb250YWluZXInKS5yZW1vdmVDbGFzcyAnaXMtLWhpZGRlbidcbiAgXG4gICQoJyNwYXNzd29yZEZpZWxkJykub24gXCJrZXl1cFwiLCAoKSAtPlxuICAgIGlmICQodGhpcykudmFsaWQoKSBhbmQgbG9naW5BdHRlbXB0cyA8PSAzXG4gICAgICByZXR1cm4gJCgnLmhhcy0tdmFsaWRhdG9yJykuZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIilcbiAgICByZXR1cm4gJCgnLmhhcy0tdmFsaWRhdG9yJykuZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKSAgXG4gIFxuICBcbiAgJCgnaW5wdXRbdHlwZT1cImVtYWlsXCJdJykub24gXCJjaGFuZ2VcIiwgKCkgLT5cbiAgICBpZiAkKHRoaXMpLnZhbCgpIGlzICdicnVjZUB3YXluZS5jb20nXG4gICAgICAkKHRoaXMpLm5leHQoJy5jLWZlZWRiYWNrLWN1YmUnKS5hZGRDbGFzcygnc2hvdy0tYnJ1Y2UnKVxuICAgIGVsc2VcbiAgICAgICQodGhpcykubmV4dCgnLmMtZmVlZGJhY2stY3ViZScpLnJlbW92ZUNsYXNzKCdzaG93LS1icnVjZScpXG4gIFxuICAkKGRvY3VtZW50KS5vbiBcInN1Ym1pdFwiLCAnZm9ybScsICgpIC0+XG4gICAgbG9naW5BdHRlbXB0cysrXG4gIFxuICAkKCcuaGFzLS12YWxpZGF0b3InKS5zdWJtaXQgKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjYXJkRmVlZGJhY2tGaWVsZCA9ICQoJy5jLWNhcmRfX2ZlZWRiYWNrJylcbiAgICBzdWJtaXRCdG5EZWZhdWx0VGV4dCA9ICQodGhpcykuZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKS52YWwoKVxuICAgIHN1Ym1pdEJ0bndhaXRpbmdUZXh0ID0gJCh0aGlzKS5maW5kKCdbdHlwZT1cInN1Ym1pdFwiXScpLmF0dHIoXCJkYXRhLXdhaXRpbmctdGV4dFwiKVxuICAgIHBhc3N3b3JkRmllbGQgPSAkKCcjcGFzc3dvcmRGaWVsZCcpXG4gIFxuICAgICQodGhpcylcbiAgICAuZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKVxuICAgIC52YWwoc3VibWl0QnRud2FpdGluZ1RleHQpXG4gICAgLmFkZENsYXNzKCdpcy0tdW5jbGlja2FibGUnKVxuICAgIFxuICAgICMgUmVzZXQgdGhlIHN1Ym1pdCBidXR0b24gdGV4dCBhZnRlciBhIHNob3J0XG4gICAgIyBwZXJpb2Qgb2YgdGltZS5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBcbiAgICAgICMgRmFrZSBhIGxvZ2luIHNpdHVhdGlvbiB0aGF0IGNhbiBmYWlsIGFuZFxuICAgICAgIyBiZSBzdWNjZXNzZnVsIGJ5IGVudGVyaW5nIFwiYmF0Y2F2ZVwiIGFzXG4gICAgICAjIHRoZSBwYXNzd29yZFxuICAgICAgaWYgcGFzc3dvcmRGaWVsZC52YWwoKSBpcyAnYmF0Y2F2ZSdcbiAgICAgICAgJChkb2N1bWVudCkuZmluZCgnLmMtY2FyZCcpLnRvZ2dsZUNsYXNzICdpcy0tc2lnbmluZy1pbidcbiAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgLmZpbmQoJy5jLWNhcmRfX3RpdGxlJylcbiAgICAgICAgLmF0dHIgXCJkYXRhLXN1YnRpdGxlXCIsIFwiU2lnbiBpbiBzdWNjZXNzZnVsXCJcbiAgICAgICAgLnRleHQgJ1N0YXkgc2hhcnAgdG9kYXkhJ1xuICAgICAgZWxzZVxuICAgICAgICBjYXJkRmVlZGJhY2tGaWVsZC5yZW1vdmVDbGFzcygnaXMtLWluIGlzLS1pbnZhbGlkIGlzLS12YWxpZCBpcy0td2FybmluZycpXG4gICAgICAgIGNhcmRGZWVkYmFja0ZpZWxkLmFkZENsYXNzKCdpcy0taW4gaXMtLWludmFsaWQnKS50ZXh0KCdOb3QgdGhlIHJpZ2h0IHBhc3N3b3JkLCBidWRkeS4gVHJ5IGFnYWluLicpXG4gICAgICAgIFxuICAgICAgICBpZiBsb2dpbkF0dGVtcHRzID49IDFcbiAgICAgICAgICAkKGRvY3VtZW50KS5maW5kKCdbZGF0YS1zaG93LWFmdGVyLWZpcnN0LWF0dGVtcHRdJykucmVtb3ZlQ2xhc3MoJ2lzLS1oaWRkZW4nKVxuICAgICAgICBcbiAgICAgICAgaWYgbG9naW5BdHRlbXB0cyA+PSAzXG4gICAgICAgICAgJCgnLmhhcy0tdmFsaWRhdG9yJykuZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKVxuICAgICAgICAgIGNhcmRGZWVkYmFja0ZpZWxkLmFkZENsYXNzKCdpcy0taW4nKS50ZXh0KCdUb28gbWFueSB0cmllcywgZHVkZS4gQ29tZSBiYWNrIGluIDEwIG1pbnV0ZXMuJylcbiAgICAgICAgXG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmZpbmQoJ1t0eXBlPVwic3VibWl0XCJdJylcbiAgICAgICAgLnZhbChzdWJtaXRCdG5EZWZhdWx0VGV4dClcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tdW5jbGlja2FibGUnKVxuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIGNhcmRGZWVkYmFja0ZpZWxkLnJlbW92ZUNsYXNzICdpcy0taW4nXG4gICAgICAgICwgNTAwMCBcbiAgICAgICAgXG4gICAgLCAyMDAwXG4gICAgIl19
//# sourceURL=coffeescript