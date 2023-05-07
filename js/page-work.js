

// ========== Fires on page load ==========

$(() => {

    var currentFilterTag = setupWorkFilter();
    var filteredWork = filterWork(currentFilterTag, work);

    var masonryGrid = new MasonryGrid();
    masonryGrid.setLocation(".masonry-grid")
               .addItems(filteredWork);

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

    // // Make our personal work a gallery
    // $("#personal").on("click", () => {

    // });

});


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

// =============== Globals and Classes ===============

class WorkType {
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
}

const workTypes = {
    client : new WorkType("Client Designs", "client"),
    development : new WorkType("Development", "development"),
    personal : new WorkType("Personal Work", "personal")
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

    // ==================== Development ==================== 
    new MasonryGridItem().setImage("./assets/images/dev-work/aptiv/thumbnail.jpg")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a screenshot of the home page of a website my roomates and I made in college. I did the frontend development for the project."),
    new MasonryGridItem().setImage("./assets/images/dev-work/artsite/thumbnail.jpg")
                         .addTag(workTypes.development.tag)
                         .setAltText("This is a screenshot of a simple web app I created when I was getting started in web development. The thumnail depicts the home page of a hypothetical site where I can sell my art with several item categories (ex. 'portraits' 'shirts' etc)."),

    // ==================== Personal ==================== 
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