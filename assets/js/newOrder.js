$(document).ready(function () {
    $('#formOrderMeth').hide();
    $('#orderHistory').hide();
    
    $('[name="phNo"]').focus();
    
    $('[name="method"]').val( $('.btn-selected').text().toLowerCase() ); // store the selected value
    
    
    $('.btn-toggle').click(function() {
        //console.log('Switching...' + $(this).text() );
        
        $('#ref-group').children().hide('fast');
        $('.btn-group').children().removeClass("btn-selected");
        
        $(this).addClass("btn-selected");
        $(this).blur(); // unfocus button - allows CSS style to be applied
        
        if ( $(this).is("[itemref]") ) {
            console.log('** itemref found! **');
            var itemVal = $(this).attr('itemref');
            $('#' + itemVal).toggle('slow');
        }
        
        $('[name="method"]').val( $(this).text().toLowerCase() ); // store the selected value
    });
    
    
    $('#phoneEnter').submit(function(e) {
        e.preventDefault();
        
        $("#main-info").text('Select the delivery method and address.');
        
        var phone = $('[name="phNo"]').val();
        
        socket.get("/Customer/find?phoneNo=" + phone , function (response) { 
            console.log(response);
            
            if (jQuery.isEmptyObject(response)) {
                window.location.href = "/customer/register";
            } else {
                $('#orderHistory').prop('href', "/order/history?customerId=" + response[0].id);
                $('#phoneEnter').hide('slow');
                $('#formOrderMeth').show('slow');
                $('#orderHistory').show('slow');
                
                $('[name="customerId"]').val(response[0].id); //set customer ID with first array object

            }
        });
    });
}); //ready()

