$(document).ready(function () {

    /* Select delivery method (take-away/home-delivery) */
    $('.btn-toggle').click(function() {
        //console.log('Switching...' + $(this).text() );

        //$('.btn-group').children().removeClass("btn-selected");
        $(this).parent().children().removeClass("btn-selected");

        $(this).addClass("btn-selected");
        $(this).blur(); // unfocus button - allows CSS style to be applied


        $('[name="paid"]').val( $(this).attr('data-datac').toLowerCase() ); // store the selected value
    });
    
});