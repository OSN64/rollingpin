$(document).ready(function () {
    
    /* Clickable menu items */
    $("#menuList > table > tbody > tr").click(function(e) {    
        var itemID = $(this).find('td:first').html();
        $('#itemIdInput').val(itemID).focus();
    });
    
    /* Submit Order button press */
    $('#submitOrder').click(function() {
        console.log("submitting order..."+$('[name="orderId"]').val());
        window.location.href = "/order/" + $('[name="orderId"]').val();
    });
    
    /* Adding item to ordered list */
    $('#addItem').submit(function(e) {
        e.preventDefault();

        socket.get("/orderitem/create?" + $('#addItem').serialize(), function (response) {
           
            //if (jQuery.isEmptyObject(response)) {
            if (typeof response.err !== "undefined") {
                    console.log('Object is empty!: '+response.err)
                } else {
                    console.log('Reply: '+response); 
                    
                    $('#orderTable > tbody').append('<tr>' + 
                                                    '<td>'+response.quantity+'</td>' + 
                                                    '<td><small>('+response.menuItemId+')</small> '+response.menuItemName+'</td>' + 
                                                    '<td>$ '+response.cost+'</td>' + 
                                                    '<td><a class="btn-sm btn-danger del" data-datac='+ response.id+ '><span class="glyphicon glyphicon-remove"></span></a></td>' + 
                                                    '</tr>'
                                                   ).hide().fadeIn('fast');          
                }

        });
        
        /* Normalize input fields */
        $('#itemIdInput').val('').focus();
        $('#itemQtyInput').val('1');
    });
    
    /* Delete specific item from ordered list */
    $('#orderList').on('click','.del', function(e) {
    //$('.del').click(function(e) {
        console.log("Delete button pressed.");
        e.preventDefault();

        var delId = $(this).data('datac');
        var parentRow = $(this).parent().parent();

        socket.delete("/orderitem/" + delId, function (response) {
            if (typeof response.err !== "undefined") {
                console.log('ERROR: '+response.err)
            } else {
                parentRow.fadeOut('slow', function() { // fade-out && delete parent row
                    parentRow.remove();
                });
            }
        });
        
    });
    
}); //ready()