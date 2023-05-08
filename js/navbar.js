$(() => {
    console.log(window);

    $(window).on("resize", () => {
        console.log("I happen");
        if (window.innerWidth > 649) {
            closeNav();
        }
    });

    // Nav bar toggling 
    $("#hamburger").click(() => {
        openNav();
    });

    $("#close").click(() => {
        closeNav();
    });

    // If someone clicks on the outside of 
    // the nav when in mobile view, exit the nav
    $("#backdrop-filter").click(() => {
        closeNav();
    });
});

function openNav() {
    $("#main-nav").attr("class", "nav-visible");
    $("#backdrop-filter").fadeIn();
    // if (isScreenDevice()) {
        $("body").css("overflow-y", "hidden");
    // } 
    $("body").css("transform", "translateX(-55vw)");
}

function closeNav() {
    $("#main-nav").attr("class", "nav-hidden");
    $("#backdrop-filter").fadeOut();
    // if (isScreenDevice()) {
        $("body").css("overflow-y", "auto");
    // } 
    $("body").css("transform", "translateX(0)");
}

// Detect if we are on a screen device
function isScreenDevice() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}