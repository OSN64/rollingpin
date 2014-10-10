$(document).ready(function () {
    $('#formordermeth').hide();
    $('#orderHistory').hide();


    $('#phoneenter').submit(function(e) {
        var phone = $('[name="phno"]').val();
        e.preventDefault();
        // console.log("name = " + phone)
        socket.get("/Customer/find?phoneno=" + phone , function (response) { 
            console.log(response)
            if (jQuery.isEmptyObject(response)) {
                console.log("create new user")
                window.location.href = "/customer/register";
            }else{
                $('#orderHistory').prop('href',"/order/history?customerid=" +response[0].id);
                $('#phoneenter').hide('slow');
                $('#formordermeth').show('slow');
                $('#orderHistory').show('slow');
                //set customer no with first array object
                $('[name="customerid"]').val(response[0].id);

            }
        });
    });
}); //ready()


// .submit(function() {
//   // var message = $('#message').val().trim();

//   // if (message != "") {
//   //   socket.emit('chat message', message);
//   //   $('#message').val('');
//   // }
//   console.log("form submitted")
// });
