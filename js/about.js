$(() => {
    $(".history-item").on("click", function(target) {
        // 812 is the magical number where the history grid breaks to two columns
        $("#history-grid").fadeToggle(300, () => {
            var clone = $(this).clone();
            $(".history").append(clone.addClass("expanded").css("display", "none"));
            clone.fadeToggle(300);

            var moreInfo = $(".history-item.expanded");

            moreInfo.on("click", () => {
                moreInfo.fadeToggle(300, () => {
                    moreInfo.remove();
                    $("#history-grid").fadeToggle(300);
                });
            })
        });
    });
});