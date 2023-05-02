class Gallery {
    startGallery(src, id, orientation) {
        //addGalleryButton("left");
        // Place the image
        $(".gallery").append($("<img>", {
            src: src,
            id: id,
            class: `gallery-current ${orientation}`
        }));
        //addGalleryButton("right");

        //updateGallerySize();

        $("#hamburger").css("z-index", "0");
        $("body").css("overflow", "hidden");

        $(".gallery").fadeIn(250);
    }

    addGalleryButton(direction) {
        $("#gallery-container").append($("<button>", {
            class: `gallery-button ${direction} hoverable`
        }).click(() => {
            var id = $(".gallery-current").attr("id");
            num = Number(id.slice(id.indexOf("-") + 1));

            // Get the next image based on which button was clicked
            // (Make sure to check the edge cases)
            num = direction == "left" ? num - 1 : num + 1;

            // Handles going over to the right
            num = num % personalWork.length;
            // Handles going over to the left
            if (num < 0) {
                num = personalWork.length - 1;
            }

            var next = personalWork[num];

            $(".gallery-current").attr("src", next.image);
            $(".gallery-current").attr("id", `thumbnail-${num}`);
        }));

        $(`.gallery-button.${direction}`).append($("<i>", {
            class: `fa-solid fa-chevron-${direction}`
        }));
    }

    closeGallery(event) {
        if (event.target == this) {
            $(".gallery").fadeOut(250, () => {
                $(".gallery .gallery-current").remove();
                $(".gallery .gallery-button").remove();

                $("#hamburger").css("z-index", "100");
                $("body").css("overflow", "auto");
            });
        }
    }

    updateGallerySize() {
        var galleryCurrent = document.querySelector(".gallery-current");
        var height = galleryCurrent.naturalHeight;
        var width = galleryCurrent.naturalWidth;

        // Portrait image
        if (height > width) {
            $(".gallery-current").css("height", "var(--portrait-height)");
            $(".gallery-current").css("width", "var(--portrait-width)");
        }
        // Landscape image
        else {
            $(".gallery-current").css("height", "var(--landscape-height)");
            $(".gallery-current").css("width", "var(--landscape-width)");
        }
    }

}