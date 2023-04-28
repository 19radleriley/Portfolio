

// ========== Fires on page load ==========

$(() => {
    // Hide things that initially shouldn't be displayed
    // Doing this so we can have gallery container auto to 'flex' display
    // $(".gallery").hide();

    var currentFilterTag = setupWorkFilter();
    var filteredWork = filterWork(currentFilterTag, work);

    var masonryGrid = new MasonryGrid();
    masonryGrid.setLocation(".masonry-grid")
               .addItems(filteredWork);

    // On click event handlers for filter
    $("#filter-dropdown > *").on("click", e => updateWorkFilter(e, masonryGrid));
    $(".filter.current").on("click", toggleWorkFilterDropdown);

    // $(".gallery").click(closeGallery);
});

// ========== Filter Functionality ==========

function setupWorkFilter() {
    var first = null;
    for (const key in workTypes) {
        if (!first) {
            first = workTypes[key].tag;
            $(".filter.current").append(workTypes[key].name);
            $(".filter.current").append(dropdownArrow);
            $(".filter.current").attr("id", first);

            // Set id of masonry grid
            $(".masonry-grid").attr("id", `${first}-work`);
        }
        else {
            $("#filter-dropdown")
                .append($(`<li>${workTypes[key].name}</li>`)
                            .attr("class", "filter hoverable")
                            .attr("id", workTypes[key].tag));
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

    var current = $(".filter.current");
    event.target.innerText = current.text().trim();
    event.target.id = current.attr("id");
    current.text(newCurrent);
    current.attr("id", newCurrentTag);
    current.append($(dropdownArrow));

    // Set id of masonry grid
    $(".masonry-grid").attr("id", `${newCurrentTag}-work`);

    var filteredWork = filterWork(newCurrentTag, work);
    masonryGrid.removeAllItems();
    masonryGrid.addItems(filteredWork);

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
                         .addTag(workTypes.client.tag),
    new MasonryGridItem().setImage("./assets/images/client-work/cba/thumbnail.jpg")
                         .setLink("./cba.html")
                         .addTag(workTypes.client.tag),

    // ==================== Development ==================== 

    // ==================== Personal ==================== 
    new MasonryGridItem().setImage("./assets/images/personal-work/clean-air.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/rose.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/mini-shoes.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/MJ.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/KB.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/Oktoberfest-Button.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/shoe.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/posterzine.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/kobe.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/nike1.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/nike2.jpg")
                         .addTag(workTypes.personal.tag),
    new MasonryGridItem().setImage("./assets/images/personal-work/spiderverse.GIF")
                         .addTag(workTypes.personal.tag),
]