$(document).ready(function () {
    $('#formOrderMeth').hide();
    $('#orderHistory').hide();
    
    $('[name="phNo"]').focus();


    $('#phoneEnter').submit(function(e) {
        var phone = $('[name="phNo"]').val();
        e.preventDefault();
        // console.log("name = " + phone)
        socket.get("/Customer/find?phoneNo=" + phone , function (response) { 
            console.log(response)
            if (jQuery.isEmptyObject(response)) {
                console.log("create new user")
                window.location.href = "/customer/register";
            }else{
                $('#orderHistory').prop('href',"/order/history?customerId=" +response[0].id);
                $('#phoneEnter').hide('slow');
                $('#formOrderMeth').show('slow');
                $('#orderHistory').show('slow');
                //set customer no with first array object
                $('[name="customerId"]').val(response[0].id);

            }
        });
    });
}); //ready()

