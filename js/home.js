$(() => {
    // Kick everything off by displaying home page
    displayHomePage();

    // Show the works page when the arrow is clicked
    $("#hero-arrow").click(() => {
        $("#cta").slideUp(750, "swing");
        $(".hero-name").slideUp(750, "swing");
        $("#hero-arrow").removeClass("dropped");
        $("#home").slideUp(750, "swing")

        $("main").slideToggle(750, "swing");
        $("#work-link").attr("class", "nav-link hoverable current");
    });
});


function displayHomePage() {
    $(".hero-name").fadeToggle(1000, "swing", () => {
        // When finished
        $("#cta").slideDown(500, "swing", () => {
            $("#hero-arrow").addClass("dropped");
        });
    });
}