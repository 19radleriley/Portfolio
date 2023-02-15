clientWork = [
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
];

personalWork = [
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
    "FIXME",
];

$(() => {
    // $(".toggle").click(() => {
    //     // Use normal javascript because in this case it is easier
    //     let toggle = document.querySelector(".toggle");

    //     if (toggle.classList.contains("active")) {
    //         toggle.classList.remove("active");
    //         toggle.classList.add("inactive");
    //         $("#selected-work-title").fadeToggle(250, () => {
    //             $("#personal-work-title").fadeToggle(250);
    //         });
    //     }
    //     else {
    //         toggle.classList.remove("inactive");
    //         toggle.classList.add("active");
    //         $("#personal-work-title").fadeToggle(250, () => {
    //             $("#selected-work-title").fadeToggle(250);
    //         });
    //     }
    // });

    for (var i = 0; i < 10; i++) {
        console.log("I happen");
        var delay = i * 100;
        $("#client-work").append($("<div></div>", {
            class : "thumbnail hoverable",
            style : `animation: fade .25s forwards ${delay}ms`
        }));
    }

    $(".work-type").click(function()  {
        if (!this.className.includes("selected")) {
            $(".work-type.selected").attr("class", "work-type hoverable");
            this.className = "work-type hoverable selected";

            // Hide / show the corresponding work section
            if (this.id == "client-title") {
                $("#client-work").css("display", "grid");
                $("#personal-work").css("display", "none");

                for (var i = 0; i < 10; i++) {
                    var delay = i * 100;
                    $("#client-work").append($("<div></div>", {
                        class : "thumbnail hoverable",
                        style : `animation: fade .25s forwards ${delay}ms`
                    }));
                }

                $("#personal-work > *").remove();
            }
            else {
                $("#client-work").css("display", "none");
                $("#personal-work").css("display", "grid");
                for (var i = 0; i < 10; i++) {
                    var delay = i * 100;
                    $("#personal-work").append($("<div></div>", {
                        class : "thumbnail hoverable",
                        style : `animation: fade .25s forwards ${delay}ms`
                    }));
                }
                $("#client-work > *").remove();
            }
        }
    });
});


