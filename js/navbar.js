$(() => {

    // Go to the home page when the logo is clicked
    $("#logo").click(() => {
        clearCurrentNavigation(); 
        $("nav").attr("aria-hidden", "true");
        $("#home").attr("aria-hidden", "false");
    })

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
});

function clearCurrentNavigation() {
    $('.page[aria-hidden="false"]').attr("aria-hidden", "true");
    $(".nav-link.current").attr("class", "nav-link hoverable");
}