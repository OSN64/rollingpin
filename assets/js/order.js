$(document).ready(function () {
    
    /* Clickable menu items */
    $("#menuList > table > tbody > tr").click(function(e) {    
        var itemID = $(this).find('td:first').html();
        $('#itemIdInput').val(itemID).focus();
    });
    
    
    /* Adding item to ordered list */
    $('#addItem').submit(function(e) {
        e.preventDefault();

        socket.get("/orderitem/create?" + $('#addItem').serialize(), function (response) {
            
            if (jQuery.isEmptyObject(response)) {
            //if (typeof response.err !== "undefined") {
                    console.log(response.err)
                } else {
                    console.log(response); 
                    
                    $('#orderTable > tbody').append('<tr>' + 
                                                    '<td>'+response.quantity+'</td>' + 
                                                    '<td><small>('+response.menuItemId+')</small> '+response.menuItemId+'</td>' + 
                                                    '<td>'+response.cost+'</td>' + 
                                                    '<td><a class="btn btn-danger del" data-datac='+ response.id+ '><span class="glyphicon glyphicon-remove"></span></td>' + 
                                                    '</tr>'
                                                   ).hide().fadeIn('fast');
                                                    
                    /*$('#myTable > tbody:last').append('<tr>...</tr><tr>...</tr>');*/
                    
/*                    var ordId = $('<p id="orderItemId">').text(response.id);
                    var menId = $('<p id="menuItemId">').text(response.menuItemId);
                    var quant = $('<p id="quantity">').text(response.quantity);
                    var cost = $('<p id="cosy">').text("$ " + response.cost);

                    // var delBut = $('<button id="del" value='+ response.id+ ' type="button">').text('Submit');
                    var delBut = $('<a class="btn btn-danger del" data-datac='+ response.id+ '>').text('X');
                    $("#orderList").append(
                        $('<li id= ' + response.id+'>').append(ordId).append(menId).append(quant).append(cost).append(delBut)
                    );
*/
                    //$('#addItem')[0].reset();             
                }

        });
        
        /* Normalize input fields */
        $('#itemIdInput').val('').focus();
        $('#itemQtyInput').val('1');
    });
    
    /* Delete specific item from ordered list */
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