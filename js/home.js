$(() => {

    setTimeout(() => {
        $("#cta").toggle(500, "swing");
    }, 1500);

    // Show the works page when the arrow is clicked
    $("#hero-arrow").click(() => {
        $("#cta").toggle(500, "swing");
        $("#home").slideToggle(750);
        $("nav").attr("aria-hidden", "false");
        $("#work").attr("aria-hidden", "false");
        $("#work-link").attr("class", "nav-link hoverable current");
    });
});