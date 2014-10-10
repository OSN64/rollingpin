$(document).ready(function () {
    $('#addItem').submit(function(e) {
        e.preventDefault();

        socket.get("/orderitem/create?" + $('#addItem').serialize(), function (response) {
            // console.log(response); 
            var ordId = $('<p id="orderItemId">').text(response.id);
            var menId = $('<p id="menuItemId">').text(response.menuItemId);
            var quant = $('<p id="quantity">').text(response.quantity);
            var delBut = $('<button id="del">').text('X');
            $("#orderList").append(
                $('<li>').append(ordId).append(menId).append(quant).append(delBut)
            );
        });
    });

    //function that deals with dell button
}); //ready()