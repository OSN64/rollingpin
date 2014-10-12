$(document).ready(function () {
    $('#formOrderMeth').hide();
    $('#orderHistory').hide();
    
    $('[name="phNo"]').focus();
    
    $('[name="method"]').val( $('.btn-selected').text().toLowerCase() ); // store the selected value
    
    /* Order History button - redirect to page */
    $('#orderHistory').click(function() {
        console.log('Clicked - order history');
        // window.location.href = "/order/history?customerId=" + $('[name="customerId"]').val();
        console.log("User Id"+ $('[name="customerId"]').val())

        socket.get("/order/history?customerId=" + $('[name="customerId"]').val() , function (response) { 
            console.log(response);
            
            if (!jQuery.isEmptyObject(response.orders)) {
                console.log("empty")
                // order empty add whatever
            } else {
                console.log("not empty")
                var nOrders = orders; // array of json objects 
                var totalPrice = response.totalPrice; //adding the total price of objects
            }
        });

    });
    
    /* Select delivery method (take-away/home-delivery) */
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
            
            $('#' + itemVal).find('input[type=text]').focus();
            
            
        }
        
        $('[name="method"]').val( $(this).text().toLowerCase() ); // store the selected value
    });
    
    /* Search for phone # */
    $('#phoneEnter').submit(function(e) {
        e.preventDefault();
        
        $("#main-info").text('Select the delivery method and address.');
        
        var phone = $('[name="phNo"]').val();
        
        socket.get("/Customer/find?phoneNo=" + phone , function (response) { 
            console.log(response);
            
            if (jQuery.isEmptyObject(response)) {
                window.location.href = "/customer/register";
            } else {
                $('[name="customerId"]').val(response[0].id); //set customer ID with first array object
                
                $('#phoneEnter').hide('slow');
                $('#formOrderMeth').show('slow');
                $('#orderHistory').show('slow');
            }
        });
    });
}); //ready()

