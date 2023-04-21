class Thumbnail {
    constructor(title, image, link, orientation) {
        this.title = title; 
        this.image = image;
        this.link = link;
        this.orientation = orientation;
    }
}

clientWork = [
    new Thumbnail("ArtsFest", "./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html", "landscape"),
    new Thumbnail("CBA", "./assets/images/client-work/cba/thumbnail.jpg", "./cba.html", "landscape"),
];

personalWork = [
    new Thumbnail("Jordan", "./assets/images/personal-work/MJ.jpg", null, "portrait"),
    new Thumbnail("Kobe", "./assets/images/personal-work/KB.jpg", null, "portrait"),
    new Thumbnail("Oktoberfest Button", "./assets/images/personal-work/Oktoberfest-Button.jpg", null, "landscape"),
    new Thumbnail("Mini-Shoes", "./assets/images/personal-work/mini-shoes.jpg", null, "portrait"),
    new Thumbnail("Rose", "./assets/images/personal-work/rose.jpg", null, "portrait"),
    new Thumbnail("Kobe", "./assets/images/personal-work/kobe.jpg", null, "portrait"),
    new Thumbnail("nike1", "./assets/images/personal-work/nike1.jpg", null, "landscape"),
    new Thumbnail("nike1", "./assets/images/personal-work/nike2.jpg", null, "landscape"),
    new Thumbnail("Shoe", "./assets/images/personal-work/shoe.jpg", null, "portrait"),
    new Thumbnail("Spiderverse", "./assets/images/personal-work/spiderverse.GIF", null, "portrait"),
    new Thumbnail("Doubt Me", "./assets/images/personal-work/Doubt-Me.jpg", null, "portrait"),
];

// Fires on page load
$(() => {
    // Hide things that initially shouldn't be displayed
    $("#gallery-container").hide();

    // Initially show the client work
    addWorkThumbnails(clientWork, "#client-work");

    $("#client-title").click(updateWorkType);
    $("#personal-title").click(updateWorkType);

    $("#gallery-container").click(closeGallery);
});

function addWorkThumbnails(workList, selector) {
   for (var i = 0; i < workList.length; i++) {
        var delay = i * 100;

        if (workList == clientWork) {
            var a = document.createElement("a");
            a.setAttribute("href", workList[i].link);
            a.setAttribute("class", "thumbnail-container");
            var img = document.createElement("img");
            img.setAttribute("src", workList[i].image);
            img.setAttribute("class", `thumbnail ${workList[i].orientation} hoverable`);

            a.appendChild(img);
            document.querySelector(selector).appendChild(a);
        }

        else {
            var div = document.createElement("div");
            div.setAttribute("class", "thumbnail-container");
            var img = document.createElement("img");
            img.setAttribute("src", workList[i].image);
            img.setAttribute("class", `thumbnail ${workList[i].orientation} hoverable`);
            img.setAttribute("id", `thumbnail-${i}`);
            div.appendChild(img);
            document.querySelector(selector).appendChild(div);
        }
    }

    // After the thumbnails have been added, set the heights 
    // of the rows to create a masonry grid
    document.querySelectorAll(`${selector} .thumbnail-container`).forEach(t => {
        t.firstChild.addEventListener("load", () => {
            setGridRowHeight(t, t.firstChild);
        });
    });
    $(window).off();
    $(window).on("resize", () => {
        setGridRowHeightAll(selector);
    });

    // Add the functionality for gallery mode
    if (workList == personalWork) {
        $(`${selector} .thumbnail`).click(function() {
            console.log(this.className);
            var orientation = this.className.includes("landscape") ? "landscape" : "portrait";
            startGallery(this.src, this.id, orientation);
        });
    }
}

function setGridRowHeight(container, thumbnail) {
    var rows = thumbnail.height / 10;
    container.setAttribute("style", `grid-row-end: span ${Math.floor(rows) + 1}`);
}

function setGridRowHeightAll(selector) {
    document.querySelectorAll(`${selector} .thumbnail-container`).forEach(t => {
        setGridRowHeight(t, t.firstChild);
    });
}

function startGallery(src, id, orientation) {
    //addGalleryButton("left");
    // Place the image
    $("#gallery-container").append($("<img>", {
        src : src,
        id : id,
        class : `gallery-current ${orientation}`
    }));
    //addGalleryButton("right");

    //updateGallerySize();

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

    console.log(height);
    console.log(width);

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