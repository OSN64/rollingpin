$(document).ready(function() {

    $('#cashPaid').click(function() {
        var orderID = $('#orderID').val();
        console.log("Marking as paid: "+ orderID );
        
        //socket.get("/order/setPaid?id="+ orderID +"&paid=true", function (response) { }
    });
    
    $('.btn').click(function() {
        var self = $(this);
        console.log('btn pressed...');
        
        if ( $(this).is("[itemref]") ) {
            console.log('** itemref found! **');
            var itemVal = $(this).attr('itemref');
        
            showPaymentForm($(itemVal) );
        }
    });
    
    function showPaymentForm(frame) {
        console.log('Running showPaymentForm.');
        $('#framePayMethod').fadeOut(1000, function() {
            frame.fadeIn('fast');
        });
    }
    
    /* YOLO foo zxz fizzle */
    var rotation = 0;
    jQuery.fn.rotate = function(degrees) {
        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                     '-moz-transform' : 'rotate('+ degrees +'deg)',
                     '-ms-transform' : 'rotate('+ degrees +'deg)',
                     'transform' : 'rotate('+ degrees +'deg)'}); // for ze motherland! 
        
        return $(this);
    };
    
    $('.btn').has('.glyphicon').hover(function() {
        rotation = Math.round(Math.random() * (3000 - 500)) + 500; // trollolol random
        $(this).find('.glyphicon').rotate(rotation); // lol Harry pot master and the glypindor house
    });
    
    /* yolo random color effect cause yolo */
    function yoloColor() {
        $('.glyphicon').each(function(i, obj) {
            var back = ["#f25318","blue","#b9db00","green","#2ea82e","1E72B0"];
            var rand = back[Math.floor(Math.random() * back.length)];
            $(this).css('color', rand);
        });
    }
    
    (function yolololol() {
        setTimeout(function() {
            yoloColor();
            yolololol();  
        }, 1000);
    }());
    
});