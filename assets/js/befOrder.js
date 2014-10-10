
socket.on('connect', function socketConnected() {

    // // Listen for Comet messages from Sails
    // socket.on('message', function messageReceived(message) {

    //   ///////////////////////////////////////////////////////////
    //   // Replace the following with your own custom logic
    //   // to run when a new message arrives from the Sails.js
    //   // server.
    //   ///////////////////////////////////////////////////////////
    //   log('New comet message received :: ', message.msg);
    //   //////////////////////////////////////////////////////

    // });

    // socket.emit('allorders', {user:"zxz"});
    

});
$('#formordermeth').hide();

$('#historybutt').hide();


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
            $('#phoneenter').hide('slow');
            $('#formordermeth').show('slow');
            $('#historybutt').show('slow');
            console.log("get phone no and set form input to it and show button")
            
            $('[name="customerid"]').val(phone);

        }
        

    })
});



// .submit(function() {
//   // var message = $('#message').val().trim();

//   // if (message != "") {
//   //   socket.emit('chat message', message);
//   //   $('#message').val('');
//   // }
//   console.log("form submitted")
// });