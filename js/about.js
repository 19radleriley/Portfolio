$(() => {

    // JS for skills section
    sizeSkillCards();
    window.onresize = sizeSkillCards;
    $(".skill").on("click", function() {
        toggleFlipped(this); 
    });

    $(".history-item").on("click", (event) => {
        var numColumns = getComputedStyle(document.querySelector("#history-grid"))
            .getPropertyValue("grid-template-columns").split(" ").length;

        if (numColumns > 1) {
            var rect = event.target.getBoundingClientRect();
            toCenter(event.target, rect.top, rect.left, rect.width, rect.height);
        }
        else {

        }
    });

});

function toggleFlipped(elem) {
    if (elem.classList.contains("flipped")) {
        elem.classList.remove("flipped");
    }
    else {
        elem.classList.add("flipped");
    }
}

function sizeSkillCards() {
    document.querySelectorAll(".skill").forEach(s => {
        s.style.height = `${s.clientWidth}px`;
    });    
    var numSkillColumns = getComputedStyle(document.querySelector("#history-grid"))
        .getPropertyValue("grid-template-columns").split(" ").length;
    $(".skill").css("perspective", `${1000 * Math.round(3 / numSkillColumns)}px`);
}

function toCenter(elem, top, left, width, height) {
    var clone = $(elem).clone().attr("class", "");
    var info = $(elem.nextElementSibling).clone();
    $(info[0].firstElementChild).append($('<button class="close hoverable">close</button>'));
    var popup = $('<div class=history-popup></div>')
                    .css("width", `${width}px`)
                    .css("height", `${height}px`)
                    .css("top", `${top}px`)
                    .css("left", `${left}px`)
                    .append(clone)
                    .append(info);

    $("body").append(popup);

    popup.toggle(0, () => {

        var numColumns = getComputedStyle(document.querySelector("#history-grid"))
                            .getPropertyValue("grid-template-columns").split(" ").length;
        var scaleFactor = numColumns == 1 ? 1 : 2;

        $(elem).css("opacity", 0);
        $(elem.previousElementSibling).css("opacity", 0);
        popup.css("transform", "translate(-50%, -50%)")
             .css("top", "50%")
             .css("left", "50%");

        setTimeout(() => {
            popup.css("width", `${Math.round(width * scaleFactor)}px`)
                .css("height", `${Math.round(height * scaleFactor)}px`);
            info.slideToggle(500);
            // Hide everything behind 
            $("#about > *").css("opacity", 0).css("pointer-events", "none");
        }, 250);


        // Event to close the popup
        $("body").on("click", (event) => {
            if (event.target == document.body ||
                event.target == $(".history-popup .close")[0] ||
                event.target == $("main")[0]) {
                info.toggle();
                toOriginal(elem, width, height);
            }
        });
    });
}

function toOriginal(orig, width, height) {
    $(".history-popup")
        .css("width", `${width}px`)
        .css("height", `${height}px`)

    setTimeout(() => {
        $(".history-popup")
            .css("top", `${orig.getBoundingClientRect().top}px`)
            .css("left", `${orig.getBoundingClientRect().left}px`)
            .css("transform", "");

        $("#about > *").css("opacity", 1).css("pointer-events", "all");
        $(".history-popup").css("opacity", 0);
        $(orig).css("opacity", 1);
        $(orig.previousElementSibling).css("opacity", 1);
        setTimeout(() => {
            $(".history-popup").remove();
        }, 250);
    }, 250);
}