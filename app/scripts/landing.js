$(document).ready(function() {
    $('.hero-content h3').click(function(){
        var subText = $(this).text();
        $(this).text(subText + "!");
    })
    
    $('.selling-points .point').hover(function() {
        console.log('Hover action triggered.');
        $(this).animate({'margin-top': '10px'});
    })
    
    var onHoverAction = function(event) {
        // this will execute when we hover over the object..duh!
        console.log('Hover action triggered.');
        $(this).animate({'margin-top': '10px'});
    };
    
    var offHoverAction = function(event) {
        // this will execute when we hover off the object
        console.log('Off-hover action triggered.');
        $(this).animate({'margin-top': '0px'});
    };
    
    $(".selling-points .point").hover(onHoverAction, offHoverAction);
});