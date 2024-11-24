$(() => {
    $(window).on("resize", () => {
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

    $(".light-dark-btn").click(() => {
        toggleLightDarkTheme();
    });

    var theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    }

    // If someone clicks on the outside of 
    // the nav when in mobile view, exit the nav
    $("#backdrop-filter").click(() => {
        closeNav();
    });
});

function toggleLightDarkTheme() {
    var current = $(".light-dark-btn.current");
    var theme = current.attr("id") == "eye-closed-svg" ? "light" : "dark";

    setTheme(theme);
    localStorage.setItem("theme", theme);
}

let dark = "rgb(15, 15, 15";
let light = "white";

function setTheme(theme) {
    var bgColor = "";
    var fgColor = "";

    if (theme == "light") {
        bgColor = light;
        fgColor = dark;
        $("#eye-closed-svg").removeClass("current");
        $("#eye-open-svg").addClass("current");
    }
    else {
        bgColor = dark;
        fgColor = light;
        $("#eye-closed-svg").addClass("current");
        $("#eye-open-svg").removeClass("current");
    }

    $("html").css("--main-background-color", bgColor);
    $("html").css("--foreground-color-1", fgColor);
}

function openNav() {
    $("body").addClass("nav-open");
    $("#backdrop-filter").fadeIn();
}

function closeNav() {
    $("body").removeClass("nav-open");
    $("#backdrop-filter").fadeOut();
}

// Detect if we are on a screen device
function isScreenDevice() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}