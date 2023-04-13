$( document ).ready(function() {

    $(this).scrollTop(0);
    
    setTimeout(function() { 
        initializeOnLoad();
    }, 1000);

    // Click event
    $('.openModal').on('click', function() {
        $('#' + $(this).attr('modal')).show();
    });

    // Click event
    $('.close').on('click', function() {
        $('.modal').hide();
    });
    
    function initializeOnLoad() {
        runLandingPageEffects();
        $('#dialog').dialog({position: {my: 'right bottom', at: 'right bottom', of: window}});
        $('.ui-dialog-titlebar-close').text('close');
        $( "#tabs" ).tabs();
        $('#example').dataTable();
    }

    function runLandingPageEffects() {
        $(".hero-animation").effect('slide', {}, 500, callback);
        $(".hero-fade").effect('fade', {}, 500, callback);
    }

    // Callback function to bring a hidden box back
    function callback() {
            $(".hero-animation").removeAttr("style").hide().fadeIn();
            $(".hero-animation > a").css('background-color', '#B48A6A');
            $(".hero-fade").removeAttr("style").hide().fadeIn();
    };

    $('.tabs').on('click', function(event) {
        console.log($(event.target).attr('href'));
        $($(event.target).attr('href')).animate({opacity: 1, marginTop: "20px"}, {duration: 2000, queue:false, easing: 'linear'});
    });

    // when dialog close is clicked
    $('.ui-dialog-titlebar-close').on('click', function() {
        $('.formSuccess').addClass('d-none');
        $('.formValidationError').addClass('d-none');

    });

    // Contact form submit
    $('#form-submit').on('click', function(event) {
        event.preventDefault();

        // Validations
        if ($('#name').val().length === 0) {
            $('.formValidationErrorMessage').text('Name is a required field');
        } else if ($('#email').val().length === 0) {
            $('.formValidationErrorMessage').text('Email is a required field');
        } else if ($("input[name='customerType']:checked") && $("input[name='customerType']:checked").val() === undefined) {
            $('.formValidationErrorMessage').text('Customer Type is a required field');
        } else if ($('#birthdate').val().length === 0) {
            $('.formValidationErrorMessage').text('Birthdate is a required field');
        } else if ($('#birthdate').val().length !== 0) {

            var dtDOB = new Date($('#birthdate').val());
            var dtCurrent = new Date();

            if ((dtCurrent.getFullYear() - dtDOB.getFullYear()) < 18) {
                $('.formValidationErrorMessage').text('You must be 18 years old to fill up the form');
            } else if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
    
                if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                    $('.formValidationErrorMessage').text('You must be 18 years old to fill up the form');
                }

                if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                    if (dtCurrent.getDate() < dtDOB.getDate()) {
                        $('.formValidationErrorMessage').text('You must be 18 years old to fill up the form');
                    }
                }
            } else {
                $('.formValidationErrorMessage').text('');
            }
        }
        
        if ($('.formValidationErrorMessage').text().length === 0 && $('#message').val() === '') {
            $('.formValidationErrorMessage').text('Fill up the message field');
        } else {
            $('.formValidationErrorMessage').text('');
        }

        if ($('.formValidationErrorMessage').text().length > 0) {
            $('.formValidationError').dialog();
            $('.formValidationError').removeClass('d-none');
            $('.ui-dialog-titlebar-close').text('close');
            return;
        }

        $('.formSuccess').dialog();
        $('.formSuccess').removeClass('d-none');
        $('.ui-dialog-titlebar-close').text('close');   
        
        setTimeout(function() { 
            location.href = '';
        }, 1000);
    });

    $('#terms').on('click', function() {
        $('#toggle').toggle('blind', {}, 500);
    })

    $('.card-img-top-main').hover(
        function() {
          $( this ).addClass( "opacity-75 pe-auto" );
        }, function() {
          $( this ).removeClass( "opacity-75" );
        }
    );

    $('.typeOfPurchase').on('change', function(event) {
        if (event.target.checked) {
            $(event.target).next().text('Wholesale');
            $(event.target).next().next().text('P ' + ((parseInt($(event.target).next().next().attr('price')) * 12) - 500).toString() + '.00');
            $(event.target).next().next().animate({
                backgroundColor: "#aa0000",
                color: "white",
                width: 150
              }, 1000 );
        } else {
            $(event.target).next().text('Retail');
            $(event.target).next().next().text('P ' + $(event.target).next().next().attr('price').toString() + '.00 / bag');
            $(event.target).next().next().animate({
                backgroundColor: "#fffff",
                color: "red",
                width: 150
              }, 1000 );

        }
    });
});