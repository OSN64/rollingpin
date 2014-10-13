$(document).ready(function () {
    $('#formOrderMeth').hide();
    $('#orderHistory').hide();
    
    $('[name="phNo"]').focus();
    
    $('[name="method"]').val( $('.btn-selected').text().toLowerCase() ); // store the selected value
    
    /* Order History button - redirect to page */
    //$('#orderHistory').click(function() {
    function getHistory() {
        console.log('[*] Fetching order history..');
        // window.location.href = "/order/history?customerId=" + $('[name="customerId"]').val();
        //console.log("User Id"+ $('[name="customerId"]').val())

        socket.get("/order/history?customerId=" + $('[name="customerId"]').val() , function (response) {
            //console.log(response);
            
            if (jQuery.isEmptyObject(response.orders)) {
            //if (typeof response.err !== "undefined") {
                console.log('Object is empty!: '+response.err)
            } else {
                console.log("[*] not empty...");
                
                $('#orderTable').slideDown(1500);
                
                var nOrders = response.orders; // array of json objects 
                var totalPrice = response.totalPrice; // Total price of ALL objects
                
                nOrders.forEach(function(e) {
                    var createdAt = new Date(e.createdAt);
                    createdAt = createdAt.toUTCString();
                    $('#orderTable > table > tbody').append('<tr class="cursor-pointer">' + 
                                                    '<td>'+e.id+'</td>' + 
                                                    '<td>'+e.method+'</td>' + 
                                                    '<td>'+e.deliveryAddr+'</td>' + 
                                                    '<td>'+e.priceSum+'</td>' + 
                                                    '<td>'+createdAt+'</td>' + 
                                                    '</tr>'
                                                   ).hide().fadeIn('fast');
                });
                
            }
        });

    };
    
    //$('#orderList').on('click','.del', function(e) {
    $('#orderTable').on('click', '.cursor-pointer', function(e) {
        //console.log("[+] row clicked!!!!!!");
        //console.log("[+] cell=" + $(this).closest('tr').children('td.one').get() );
        
        var clickedAddr = $(this).find('td:eq(2)').html();
        $('[name="deliveryAddr"]').val(clickedAddr).focus()
        
        console.log("[+] cell=" + clickedAddr );
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
        
        $("#main-info").text('Select the delivery method and address. You can also select the address from a previous order by clicking an address from the Order History shown below.');
        
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
                
                getHistory(); // show customer's order history
            }
        });
    });
}); //ready()

