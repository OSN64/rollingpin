$(document).ready(function () {
    $('#addItem').submit(function(e) {
        e.preventDefault();

        socket.get("/orderitem/create?" + $('#addItem').serialize(), function (response) {
            if (typeof response.err !== "undefined") {
                    console.log(response.err)
                }else{
                    console.log(response); 
                    var ordId = $('<p id="orderItemId">').text(response.id);
                    var menId = $('<p id="menuItemId">').text(response.menuItemId);
                    var quant = $('<p id="quantity">').text(response.quantity);
                    var cost = $('<p id="cosy">').text("$ " + response.cost);
                    // var delBut = $('<button id="del" value='+ response.id+ ' type="button">').text('Submit');
                    var delBut = $('<a class="btn btn-danger del" data-datac='+ response.id+ '>').text('X');
                    $("#orderList").append(
                        $('<li id= ' + response.id+'>').append(ordId).append(menId).append(quant).append(cost).append(delBut)
                    );
                    $('#addItem')[0].reset();             
                }

            
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