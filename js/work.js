$(() => {
    $(".toggle").click(() => {
        // Use normal javascript because in this case it is easier
        let toggle = document.querySelector(".toggle");

        if (toggle.classList.contains("active")) {
            toggle.classList.remove("active");
            toggle.classList.add("inactive");
            $("#selected-work-title").fadeToggle(250, () => {
                $("#personal-work-title").fadeToggle(250);
            });
        }
        else {
            toggle.classList.remove("inactive");
            toggle.classList.add("active");
            $("#personal-work-title").fadeToggle(250, () => {
                $("#selected-work-title").fadeToggle(250);
            });
        }
    });
})