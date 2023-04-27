class Thumbnail {
    constructor(imageLocation, externalLink, orientation, altText) {
        this.imageLocation = imageLocation;
        this.externalLink = externalLink;
        this.orientation = orientation;
        this.altText = altText;
    }
}

clientWork = [
    new Thumbnail("./assets/images/client-work/artsfest/thumbnail.png", "./artsfest.html", "landscape"),
    new Thumbnail("./assets/images/client-work/cba/thumbnail.jpg", "./cba.html", "landscape"),
];

personalWork = [
    new Thumbnail("./assets/images/personal-work/clean-air.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/rose.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/mini-shoes.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/MJ.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/KB.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/Oktoberfest-Button.jpg", null, "landscape"),
    new Thumbnail("./assets/images/personal-work/shoe.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/posterzine.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/kobe.jpg", null, "portrait"),
    new Thumbnail("./assets/images/personal-work/nike1.jpg", null, "landscape"),
    new Thumbnail("./assets/images/personal-work/nike2.jpg", null, "landscape"),
    new Thumbnail("./assets/images/personal-work/spiderverse.GIF", null, "portrait"),
];

// Fires on page load
$(() => {
    // Hide things that initially shouldn't be displayed
    // Doing this so we can have gallery container auto to 'flex' display
    $(".gallery").hide();

    // Initially show the client work
    addMasonryGridItems(clientWork, "#client-work");

    $(".filter.current").on("click", toggleWorkFilterDropdown);
    $("#filter-dropdown > *").on("click", updateWorkFilter);

    // $("#client-title").click(updateWorkType);
    // $("#personal-title").click(updateWorkType);

    $(".gallery").click(closeGallery);
});

function updateWorkFilter() {
    console.dir(this);
    var temp = this.innerText;
    this.innerText = $(".filter.current").text().trim();
    $(".filter.current").text(temp);
    $(".filter.current").append($(dropdownArrow));

    // Rehide the dropdown
    updateFilterClickOff();
    $("#filter-dropdown").css("display", "none");
}

function toggleWorkFilterDropdown() {
    updateFilterClickOff();
    $("#filter-dropdown").slideToggle(250, "swing");
}

function updateFilterClickOff() {
    var dropdown = $("#filter-dropdown");

    // If the dropdown is not showing and we are about to show it
    if (dropdown.css("display") == "none") {
        $(window).on("click", clickOffFilter);
    }
    else {
        $(window).off("click", clickOffFilter);
    }
}

function clickOffFilter(e) {
    if (!e.target.closest("#work-filter")) {
        toggleWorkFilterDropdown();
    }
}

// function updateWorkType() {
//     if (!this.className.includes("selected")) {
//         $(".work-type.selected").attr("class", "work-type hoverable");
//         this.className = "work-type hoverable selected";

//         // Hide / show the corresponding work section
//         if (this.id == "client-title") {
//             $("#client-work").css("display", "grid");
//             $("#personal-work").css("display", "none");

//             addMasonryGridItems(clientWork, "#client-work");
//             $("#personal-work > *").remove();
//         }
//         else {
//             $("#client-work").css("display", "none");
//             $("#personal-work").css("display", "grid");

//             addMasonryGridItems(personalWork, "#personal-work");
//                  // Add the functionality for gallery mode
//             $("#client-work > *").remove();

//             $(`#personal-work .masonry-grid-item`).click(function() {
//                 var orientation = this.className.includes("landscape") ? "landscape" : "portrait";
//                 startGallery(this.src, this.id, orientation);
//             });
//         }
//     }
// }

const dropdownArrow = `
<svg class="dropdown-arrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
style="enable-background:new 0 0 50 50;" xml:space="preserve">
<polygon points="40,23.8 40,17.5 10,17.5 10,23.8 25,42.5 " />
</svg>
`