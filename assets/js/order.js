$(document).ready(function () {
    $('#addItem').submit(function(e) {
        e.preventDefault();

        socket.get("/orderitem/create?" + $('#addItem').serialize(), function (response) {
            // console.log(response); 
            var ordId = $('<p id="orderItemId">').text(response.id);
            var menId = $('<p id="menuItemId">').text(response.menuItemId);
            var quant = $('<p id="quantity">').text(response.quantity);
            // var delBut = $('<button id="del" value='+ response.id+ ' type="button">').text('Submit');
            var delBut = $('<a class="btn btn-danger del" data-datac='+ response.id+ '>').text('X');
            $("#orderList").append(
                $('<li id= ' + response.id+'>').append(ordId).append(menId).append(quant).append(delBut)
            );
        });
    });
    $('#orderList').on('click','.del', function(e) {
            e.preventDefault();
            var delId = $(this).data('datac');
            socket.delete("/orderitem/"+delId, function (response){
                console.log(response)
                if (typeof response.err !== "undefined") {
                    console.log(response.err)
                }else{
                    $('#orderList #'+ delId).remove();                    
                }
            });
        });
}); //ready()