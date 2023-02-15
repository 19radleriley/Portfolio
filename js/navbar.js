$(() => {

    // Nav bar toggling 
    $("#hamburger").click(() => {
        var hidden = $("nav").attr("class");

        // Not hidden so hide it
        if (hidden == "nav-visible") {
            $("nav").attr("class", "nav-hidden");
            $("#backdrop-filter").fadeOut();
            $("body").css("overflow", "auto");
        }
        // Hidden so show it
        else {
            $("nav").attr("class", "nav-visible");
            $("#backdrop-filter").fadeIn();

            $("body").css("overflow", "hidden");
        }
    });

    // If someone clicks on the outside of 
    // the nav when in mobile view, exit the nav
    $("#backdrop-filter").click(() => {
        $("nav").attr("class", "nav-hidden");
        $("#backdrop-filter").fadeOut();
        $("body").css("overflow", "auto");
    });
});