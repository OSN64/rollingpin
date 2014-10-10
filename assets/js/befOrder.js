
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

// .submit(function() {
//   // var message = $('#message').val().trim();

//   // if (message != "") {
//   //   socket.emit('chat message', message);
//   //   $('#message').val('');
//   // }
//   console.log("form submitted")
// });