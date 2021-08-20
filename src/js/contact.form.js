/**
*
* ----------------------------------------------------------
*
* Template : Brainda - Online Courses & Learning HTML Template
* Author : thecodude
* Author URI : http://thecodude.com/
*
* ----------------------------------------------------------
*
**/

jQuery(document).ready(function($) {
    'use strict';

    // Get the form.
    var form = $('#contactForm');

    // Get the messages div.
    var formMessages = $('#formMessages');

    // Set up an event listener for the contact form.
    $(form).on('submit', function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('alert alert-warning');
            $(formMessages).addClass('alert alert-success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name, #email, #subject, #message').val('');
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('alert alert-success');
            $(formMessages).addClass('alert alert-warning');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});