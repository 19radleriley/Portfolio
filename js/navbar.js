$(() => {

    // Go to the home page when the logo is clicked
    $("#logo").click(() => {
        clearCurrentNavigation(); 
        $("nav").attr("class", "nav-hidden");

        $("main").fadeToggle(100, () => {
            // displayHomePage();
            $("#home").fadeToggle(0, () => {
                displayHomePage();
            });
        });
    });

    // Update the nav-links and pages on click
    $(".nav-link").click(event => {
    
        var classes = event.target.classList;

        // This is not the current class, update it 
        if (!classes.contains("current")) {

            clearCurrentNavigation();
            event.target.classList.add("current");

            switch (event.target.id) {
                case "work-link":
                    $("#work").attr("aria-hidden", "false");                    
                    break;
                case "about-link":
                    $("#about").attr("aria-hidden", "false");                    
                    break;
                case "contact-link":
                    $("#contact").attr("aria-hidden", "false");                    
                    break;
                default:
                    break;
            }
        }

        // Else this is already the current...Do nothing
    });

    // Nav bar toggling 
    $("#hamburger").click(() => {
        var hidden = $("nav").attr("class");

        // Not hidden so hide it
        if (hidden == "nav-visible") {
            $("nav").attr("class", "nav-hidden");
            $("#backdrop-filter").fadeOut();
        }
        // Hidden so show it
        else {
            $("nav").attr("class", "nav-visible");
            $("#backdrop-filter").fadeIn();
        }
    });

    // If someone clicks on the outside of 
    // the nav when in mobile view, exit the nav
    $("#backdrop-filter").click(() => {
        $("nav").attr("class", "nav-hidden");
        $("#backdrop-filter").fadeOut();
    });
});

function clearCurrentNavigation() {
    $('.page[aria-hidden="false"]').attr("aria-hidden", "true");
    $(".nav-link.current").attr("class", "nav-link hoverable");
}