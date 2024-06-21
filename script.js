// Get the button
var topButton = documet.getElementById("top-button");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

//When the user clicks on the button, scroll to the top
function topFunction() {
    document.body.scrollTop = 0; //For safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};