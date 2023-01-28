$(() => {
    // Show the works page when the arrow is clicked
    $("#hero-arrow").click(() => {
        $("#home").attr("aria-hidden", "true");
        $("nav").attr("aria-hidden", "false");
        $("#work").attr("aria-hidden", "false");
        $("#work-link").attr("class", "nav-link hoverable current");
    });
});