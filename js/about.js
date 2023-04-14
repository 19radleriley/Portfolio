$(() => {
    $(".history-item").on("click", function(target) {
        // 812 is the magical number where the history grid breaks to two columns
        // if (window.innerWidth >= 812) {
            $("#history-grid").slideToggle(500, () => {
                var clone = $(this).clone();
                $(".history").append(clone.addClass("expanded").css("display", "none"));
                clone.slideToggle(500);

                var moreInfo = $(".history-item.expanded");

                moreInfo.on("click", () => {
                    moreInfo.slideToggle(500, () => {
                        moreInfo.remove();
                        $("#history-grid").slideToggle(500);
                    });
                })
            });
        // }
    });
});