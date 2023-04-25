function addMasonryGridItems(items, selector) {
    for (var i = 0; i < items.length; i++) {
         if (items == clientWork) {
             var a = document.createElement("a");
             a.setAttribute("href", items[i].externalLink);
             a.setAttribute("class", "masonry-grid-item-container");
             var img = document.createElement("img");
             img.setAttribute("src", items[i].imageLocation);
             img.setAttribute("class", `masonry-grid-item ${items[i].orientation} hoverable`);
 
             a.appendChild(img);
             document.querySelector(selector).appendChild(a);
         }
 
         else {
             var div = document.createElement("div");
             div.setAttribute("class", "masonry-grid-item-container");
             var img = document.createElement("img");
             img.setAttribute("src", items[i].imageLocation);
             img.setAttribute("class", `masonry-grid-item ${items[i].orientation} hoverable`);
             img.setAttribute("id", `masonry-grid-item-${i}`);
             div.appendChild(img);
             document.querySelector(selector).appendChild(div);
         }
     }
 
     // After the items have been added, set the heights 
     // of the rows to create a masonry grid
     document.querySelectorAll(`${selector} .masonry-grid-item-container`).forEach(t => {
         t.firstChild.addEventListener("load", () => {
             setGridRowHeight(t, t.firstChild);
         });
     });
 
     // Remove any potential events on the window
     // And then add one to resize grid on window resize
     $(window).off();
     $(window).on("resize", () => {
         setGridRowHeightAll(selector);
     });
}

function setGridRowHeight(container, masonryGridItem) {
    var rows = masonryGridItem.height / 10;
    container.setAttribute("style", `grid-row-end: span ${Math.floor(rows) + 1}`);
}

function setGridRowHeightAll(selector) {
    document.querySelectorAll(`${selector} .masonry-grid-item-container`).forEach(t => {
        setGridRowHeight(t, t.firstChild);
    });
}