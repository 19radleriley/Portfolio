class Thumbnail {
    constructor(title, image, link) {
        this.title = title; 
        this.image = image;
        this.link = link;
    }
}

clientWork = [
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
];

personalWork = [
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html"),
];

// Fires on page load
$(() => {
    $("#gallery-container").hide();

    addWorkThumbnails(clientWork, "#client-work");

    $(".work-type").click(updateWorkType);

    $("#gallery-container").click(closeGallery);
});

function addWorkThumbnails(workList, selector) {
   for (var i = 0; i < workList.length; i++) {
        var delay = i * 100;

        if (workList == clientWork) {
            $("<a>", {
                href : workList[i].link
            }).append($("<img>", {
                src : workList[i].image,
                class : "thumbnail hoverable",
                style : `animation: fade .25s forwards ${delay}ms`
            })).appendTo(selector);
        }

        else {
            $(selector).append($("<img>", {
                src : workList[i].image,
                class : "thumbnail hoverable",
                id : `thumbnail-${i}`,
                style : `animation: fade .25s forwards ${delay}ms`
            }));
        }
    }

    // Add the functionality for gallery mode
    if (workList == personalWork) {
        $(`${selector} > .thumbnail`).click(function() {
            startGallery(this.src, this.id);
        });
    }
}

function startGallery(src, id) {
    addGalleryButton("left");
    // Place the image
    $("#gallery-container").append($("<img>", {
        src : src,
        id : id,
        class : "gallery-current" 
    }));
    addGalleryButton("right");

    updateGallerySize();

    // FIX LATER?
    $("#hamburger").css("z-index", "0");
    $("body").css("overflow", "hidden");

    $("#gallery-container").fadeIn(250);
}

function addGalleryButton(direction) {
    $("#gallery-container").append($("<button>", {
        class : `gallery-button ${direction} hoverable`
    }).click(() => {
        var id = $(".gallery-current").attr("id");
        num = Number(id.slice(id.indexOf("-") + 1));   // Still not working here

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
        class : `fa-solid fa-chevron-${direction}`
    }));
}

function closeGallery(event) {
    if (event.target == this) {
        $("#gallery-container").fadeOut(250, () => {
            $("#gallery-container .gallery-current").remove();
            $("#gallery-container .gallery-button").remove();

            // FIX LATER?
            $("#hamburger").css("z-index", "100");
            $("body").css("overflow", "auto");
        });
    }
}

function updateGallerySize() {
    var galleryCurrent = document.querySelector(".gallery-current");
    var height = galleryCurrent.naturalHeight;
    var width = galleryCurrent.naturalWidth; 

    // Portrait image
    if (height > width) {
        $(".gallery-current").css("height", "75%");
        $(".gallery-current").css("width", "auto");
    }
    // Landscape image
    else {
        $(".gallery-current").css("height", "auto");
        $(".gallery-current").css("width", "50%");
    }
}

function updateWorkType() {
    if (!this.className.includes("selected")) {
        $(".work-type.selected").attr("class", "work-type hoverable");
        this.className = "work-type hoverable selected";

        // Hide / show the corresponding work section
        if (this.id == "client-title") {
            $("#client-work").css("display", "grid");
            $("#personal-work").css("display", "none");

            addWorkThumbnails(clientWork, "#client-work");

            $("#personal-work > *").remove();
        }
        else {
            $("#client-work").css("display", "none");
            $("#personal-work").css("display", "grid");

            addWorkThumbnails(personalWork, "#personal-work");
            $("#client-work > *").remove();
        }
    }
}