$(() => {
    $(".history-item").on("click", function(target) {
        // 812 is the magical number where the history grid breaks to two columns
        $("#history-grid").fadeToggle(300, () => {
            var clone = $(this).clone();
            $("#history").append(clone.addClass("expanded").css("display", "none"));
            $(".history-item.expanded .thumbnail-title").remove();
            $(".history-item.expanded .thumbnail").removeClass("hoverable");
            clone.fadeToggle(300);
            var moreInfo = $(".history-item.expanded");

            $(".history-item.expanded .more-info").append($('<button class="back hoverable">back</button>').on("click", () => {
                moreInfo.fadeToggle(300, () => {
                    moreInfo.remove();
                    $("#history-grid").fadeToggle(300);
                });
            }));
        });
    });
});