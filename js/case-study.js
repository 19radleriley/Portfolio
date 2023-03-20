const RIGHT = 1;
const LEFT = -1;

$(() => {
    $(".fa-chevron-right.slide-show-btn").on("click", () => {
        updateSlideShow(RIGHT);
    });
    $(".fa-chevron-left.slide-show-btn").on("click", () => {
        updateSlideShow(LEFT);
    });
});

function updateSlideShow(direction) {
    var current = $(".slide-show-content > .current");
    var next;

    console.log(current);

    if (direction == RIGHT) {
        next = current[0].nextElementSibling;

        if (next == null) {
            next = $(".slide-show-content")[0].children[0];
        }
    }
    else {
        next = current[0].previousElementSibling;

        if (next == null) {
            var content = $(".slide-show-content")[0];
            var length = content.children.length;
            next = content.children[length - 1];
        }
    }

    $(current).removeClass("current");
    $(next).addClass("current");
    // next.className = "current";
}