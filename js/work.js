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
                style : `animation: fade .25s forwards ${delay}ms`
            }));
        }
    }
}

$(() => {

    addWorkThumbnails(clientWork, "#client-work");

       $(".work-type").click(function()  {
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
    });
});


