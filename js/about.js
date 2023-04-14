$(() => {
    $(".history-item").on("click", function(target) {
        // 812 is the magical number where the history grid breaks to two columns
        // if (window.innerWidth >= 812) {
            $("#history-grid").fadeToggle(250, () => {
                var clone = $(this).clone();
                $(".history").append(clone.addClass("expanded").css("display", "none"));
                clone.fadeToggle(250);

                var moreInfo = $(".history-item.expanded");

                moreInfo.on("click", () => {
                    moreInfo.fadeToggle(250, () => {
                        moreInfo.remove();
                        $("#history-grid").fadeToggle(500);
                    });
                })
            });
        // }
    });
});