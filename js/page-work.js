
import Gallery from "./gallery.js"
import { MasonryGrid, MasonryGridItem } from "./masonry-grid.js"

function getFilterObserver() {
    return new IntersectionObserver(entries => {
        entries.forEach(e => {
            var filter = document.querySelector("#work-filter");

            if (!e.isIntersecting && e.boundingClientRect.x >= 0) {
                    filter.classList.add("stuck");
            }
            else {
                filter.classList.remove("stuck");
            }
        });
    }, { threshold : 1 });
}

function observeFilter(observer) {
    if (window.innerWidth <= 770) {
        var filter = document.querySelector("#work-filter");
        var elements = observer.takeRecords();
        if (!elements.some(entry => entry.target == filter)) {
            observer.observe(filter);
        }
    }
    else {
        observer.disconnect();
    }
}

// checkIfStuck(observer)

// =============== Globals and Classes ===============

class WorkType {
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
}

const workTypes = {
    personal : new WorkType("Personal Art", "personal"),
    client : new WorkType("Graphic Design", "client"),
    development : new WorkType("Web Development", "development"),
}

const dropdownArrow = `
<svg class="dropdown-arrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
style="enable-background:new 0 0 50 50;" xml:space="preserve">
<polygon points="35.1,32.7 35.1,28.4 14.9,28.4 14.9,32.7 25,45.2 " />
<polygon points="25,4.8 14.9,17.3 14.9,21.6 35.1,21.6 35.1,17.3 " />
</svg>
`

const work = [
    // ==================== Client ==================== 
    new MasonryGridItem().setImage("./assets/images/client-work/artsfest/thumbnail.png")
                         .setLink("./artsfest.html")
                         .addTag(workTypes.client.tag)
                         .setAltText("This is the thumbnail for my 'ArtsFest' case study. It's image of me holding a poster I created for an art fest where there are two hands embracing in the middle."),
    new MasonryGridItem().setImage("./assets/images/client-work/cba/thumbnail.jpg")
                         .setLink("./cba.html")
                         .addTag(workTypes.client.tag)
                         .setAltText("This is the thumbnail for my 'CBA' case study. It's a concept image of the a logo I created for the College of Business adnimistration at the University of Wisconsin La Crosse depicting a simplified representation of their building over top of the text 'College of Business Administration'."),
    new MasonryGridItem().setImage("./assets/images/client-work/motivation-marathon/thumbnail.jpg")
                         .setLink("./motivation-marathon.html")
                         .addTag(workTypes.client.tag)
                         .setAltText("This is the thumbnail image for a 'case study' I did where I had artificial intelligence be my 'client'. It tasked me with creating a poster for a hypothetical event called Motivation Marathon. The poster depicts a hand with a running watch over bold text saying 'Motivation Marathon'."),


    // ==================== Development ==================== 
    new MasonryGridItem().setImage("./assets/images/dev-work/run-tracker/thumbnail.jpg")
                         .setLink("./run-tracker.html")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a thumbnail image for a run-tracker web app that I created using ASP .NET. The image depicts a phone screen with my web app on it."),
    new MasonryGridItem().setImage("./assets/images/dev-work/travelist/thumbnail.jpg")
                         .setLink("./travelist.html")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a thumbnail image for a travel website that I made. The thumbnail depicts a phone with my site sitting on a journal next to a laptop."),
    new MasonryGridItem().setImage("./assets/images/dev-work/aptiv/thumbnail.jpg")
                         .setLink("./team-aptiv.html")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a screenshot of the home page of a website my roomates and I made in college. I did the frontend development for the project."),
    new MasonryGridItem().setImage("./assets/images/dev-work/old-portfolio/thumbnail.jpg")
                         .setLink("./old-portfolio.html")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a thumbnail image for my old portfolio site. It depicts the site with the words 'Live is Like a Sketchbook, Here's Mine' on the front of the page."),
    new MasonryGridItem().setImage("./assets/images/dev-work/artsite/thumbnail.jpg")
                         .setLink("./artsite.html")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a screenshot of a simple web app I created when I was getting started in web development. The thumnail depicts the home page of a hypothetical site where I can sell my art with several item categories (ex. 'portraits' 'shirts' etc)."),

    // ==================== Personal ==================== 
    new MasonryGridItem().setImage("https://img.vsco.co/375c41/273964258/67aab3e090d9d2771392fb0d/vsco_021025.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A digital painting of a girl with tattoos and a shining heart necklace."),
    new MasonryGridItem().setImage("https://img.vsco.co/375c41/273964258/67969aacae520235914e5d27/FuelCellVsco.png")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A digital painting of a pair of shoes hanging in front of a brick wall with some ivy on it."),
    new MasonryGridItem().setImage("./assets/images/personal-work/KateStillLife.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A digital painting of a sign on a wall."),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=1200,height=1200/375c41/273964258/674bdfe0cd903ac3138f13cf/GoForAWalk.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A retro digital landscape of someone walking on a beach."),
    new MasonryGridItem().setImage("https://img.vsco.co/375c41/273964258/674259be9e7804b421dfbb3d/Doom.png")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A digital painting of a metal mask."),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=1200,height=1855/375c41/273964258/6711d8a7cef0a64403fad82b/vsco_101724.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("A digital painting of a pair of Nike running shoes."),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=540,height=960/375c41/273964258/669f02cfab9871513e54be69/vsco_072224.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText(""),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=517,height=800/375c41/273964258/668429a52cfe4669db95cc75/Goggins.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText(""),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=1200,height=900/375c41/273964258/65b714260f3587c41ccc5db3/HNI.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText(""),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=480,height=360/375c41/273964258/65a2bc5f55c4c8ad91a22c5e/MJFlying.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText(""),
    new MasonryGridItem().setImage("https://img.vsco.co/cdn-cgi/image/width=480,height=640/375c41/273964258/659acd803604440bbb925ce5/BiggieFinal.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText(""),
    new MasonryGridItem().setImage("./assets/images/personal-work/watch.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a colored pencil drawing of my running watch. On the watchfaces it reads 16:53 which is my PR for a 5k that I am trying to beat."),
    new MasonryGridItem().setImage("./assets/images/personal-work/DDLM.png")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing of a caleverita (skull) that I created. I wanted to do something related to spanish and also tie in motivation / branding. The text 'todos mueren solo hazlo' translates to 'everyone dies just do it' which is a nod to Nike's iconic slogan!"),
    new MasonryGridItem().setImage("./assets/images/personal-work/clean-air.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing of a Nike shoe I did for Earth Day. Surrounding the shoe are the words 'Keep our air clean'."),
    new MasonryGridItem().setImage("./assets/images/personal-work/rose.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing of a rose. The rose is depicted growing through a piece of concrete to symbolize the tenacicity and perseverance."),
    new MasonryGridItem().setImage("./assets/images/personal-work/mini-shoes.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a mini colored pencil drawing I did of three different shoes. Each is about 1 to 2 inches in size"),
    new MasonryGridItem().setImage("./assets/images/personal-work/MJ.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a semi-realistic colored pencil drawing I did of Michel Jordan."),
    new MasonryGridItem().setImage("./assets/images/personal-work/KB.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a semi-realistic colored pencil drawing I did of Kobe Bryant."),
    new MasonryGridItem().setImage("./assets/images/personal-work/Oktoberfest-Button.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a button design I made for Oktoberfest in the town I went to college in. It depicts two cartoon people drinking together beneath the slogan '2023 Come Fest With Me'"),
    new MasonryGridItem().setImage("./assets/images/personal-work/shoe.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is an image of me holding a pair of Nike shoes I painted for a friend. They depict a beach sunset with palmtrees in the foreground."),
    new MasonryGridItem().setImage("./assets/images/personal-work/posterzine.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is the front of a poster I did for a graphic design class my senior year of college. It depicts Alexander the Great as if he were a neon sign in front of the saying 'I would rather live a short life of glory than a long one of obscurity.'"),
    new MasonryGridItem().setImage("./assets/images/personal-work/kobe.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing I did of Kobe Bryant. It is a simplified representation of him above the word 'Bryant' which is drippign as if it were covered in paint."),
    new MasonryGridItem().setImage("./assets/images/personal-work/nike1.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing I did as a concept for a Nike logo. It depicts a person lazily laying on top of the Nike logo spinnign a basketball on their finger."),
    new MasonryGridItem().setImage("./assets/images/personal-work/nike2.jpg")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is a digital drawing I did as a concept for a Nike logo. It depicts a pair of Nike shoes dangling from the Nike logo as if someone had tied them there or thrown them over the top."),
    new MasonryGridItem().setImage("./assets/images/personal-work/spiderverse.GIF")
                         .addTag(workTypes.personal.tag)
                         .setAltText("This is an animated gif I created of one of my favorite movies: Spiderman Into the Spiderverse as a way to hype myself up for the sequel movie."),
]

var gallery = null;

// ========== Filter Functionality ==========

function setupWorkFilter() {
    var first = null;
    var i = 0;
    for (const key in workTypes) {
        if (!first) {
            first = workTypes[key].tag;
            $(".filter.current").append(workTypes[key].name);
            $(".filter.current").append(dropdownArrow);
            $(".filter.current").attr("id", first);
            $(".filter.current").attr("tabindex", i);

            // Set id of masonry grid
            $(".masonry-grid").attr("id", `${first}-work`);
        }
        else {
            $("#filter-dropdown")
                .append($(`<li>${workTypes[key].name}</li>`)
                            .attr("class", "filter hoverable")
                            .attr("id", workTypes[key].tag)
                            .attr("tabindex", i));
        }
    }

    return first;
}

function filterWork(filter, work) {
    return work.filter(w => w.tags.includes(filter));
}

function updateWorkFilter(event, masonryGrid) {
    var newCurrent = event.target.innerText;
    var newCurrentTag = event.target.id;
    var newCurrentTabIndex = event.target.tabIndex;

    var current = $(".filter.current");
    console.dir(current[0]);

    var leavingPersonalWork = current[0].id == workTypes.personal.tag;
    var enteringPersonalWork = event.target.id == workTypes.personal.tag;

    event.target.innerText = current.text().trim();
    event.target.id = current.attr("id");
    event.target.tabIndex = current.attr("tabindex");
    current.text(newCurrent);
    current.attr("id", newCurrentTag);
    current.attr("tabindex", newCurrentTabIndex);
    current.append($(dropdownArrow));

    // Set id of masonry grid
    $(".masonry-grid").attr("id", `${newCurrentTag}-work`);

    var filteredWork = filterWork(newCurrentTag, work);
    masonryGrid.removeAllItems();
    masonryGrid.addItems(filteredWork);

    if (enteringPersonalWork) {
        gallery = new Gallery();
        gallery.startGallery(".masonry-grid", ".masonry-grid-item-container");
    }
    else if (leavingPersonalWork) {
        gallery.destroyGallery();
    }

    // Rehide the dropdown
    updateFilterClickOff();
    toggleWorkFilterDropdown(0);
}

function toggleWorkFilterDropdown(time) {
    updateFilterClickOff();
    $("#filter-dropdown").slideToggle(time != undefined ? time : 250);
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

// ========== Fires on page load ==========

$(() => {

    var currentFilterTag = setupWorkFilter();
    var filteredWork = filterWork(currentFilterTag, work);

    var masonryGrid = new MasonryGrid();
    masonryGrid.setLocation(".masonry-grid")
               .addItems(filteredWork);


    // Added when changing to just personal work
    gallery = new Gallery();
    gallery.startGallery(".masonry-grid", ".masonry-grid-item-container");
    // Added when changing to just personal work


    // On click event handlers for filter
    $("#filter-dropdown > *").on("click keydown", e => {
        // For accessibility, only call function if enter key pressed
        if (e.type == "click" || e.type == "keydown" && e.which == 13) {
            updateWorkFilter(e, masonryGrid)
        }
    });
    $(".filter.current").on("click keydown", e => {
        // For accessibility, only call function if enter key pressed
        if (e.type == "click" || e.type == "keydown" && e.which == 13) {
            toggleWorkFilterDropdown();
        }
    });

    var filterObserver = getFilterObserver();
    observeFilter(filterObserver);

    $(window).on("resize", () => {
        observeFilter(filterObserver);
    });

    // // Make our personal work a gallery
    // $("#personal").on("click", () => {

    // });
});
