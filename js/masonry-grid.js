class MasonryGridItem {
    constructor() {
        this.container = document.createElement("div");
        this.container.setAttribute("class", "masonry-grid-item-container");
        this.tags = [];
    }

    setImage(src) {
        this.img = document.createElement("img");
        this.img.setAttribute("src", src);
        this.img.setAttribute("class", "masonry-grid-item");
        if (this.a) {
            this.a.appendChild(this.img);
            this.container.appendChild(this.a);
        }
        else {
            this.container.appendChild(this.img);
        }
        return this;
    }

    setLink(href) {
        this.a = document.createElement("a");
        this.a.setAttribute("href", href);
        if (this.img) {
            this.container.removeChild(this.img);
            this.a.appendChild(this.img);
        }
        this.container.appendChild(this.a);
        return this;
    }

    addTag(tag) {
        this.tags.push(tag); 
        return this;
    }
}

class MasonryGrid {
    constructor() {
        this.firstTime = true;
    }

    setLocation(location) {
        this.location = location;
        return this;
    }

    addItems(items) {
        items.forEach(i => {
            document.querySelector(this.location).appendChild(i.container);
        });

        // // Set the heights of the items
        // // Need to wait the first time in case images aren't loaded yet
        this.setItemRowHeightsAll(this.firstTime);
        this.firstTime = false;

        // Remove any potential events on the window
        // And then add one to resize items on window resize
        $(window).off();
        $(window).on("resize", () => {
            this.setItemRowHeightsAll(false);
        });
    }

    removeAllItems() {
        document.querySelectorAll(`${this.location} > *`).forEach(e => {
            e.remove();
        });
    }

    temp(items) {
        items.forEach(item => {
            console.log(item);

        });
    }

    setItemRowHeightsAll(wait) {
        document.querySelectorAll(`${this.location} .masonry-grid-item`).forEach(t => {
            var container = t.closest(".masonry-grid-item-container");
            // if (wait) {
            // console.log("I happen");
                // t.addEventListener("load", () => {
                //     this.setItemRowHeight(container, t);
                // });
            // } 
            // else {

            this.waitForElementHeight(t, () => {
                this.setItemRowHeight(container, t);
            });

                // this.setItemRowHeight(container, t);
            // }
        });
    }

    waitForElementHeight(element, callback) {
        if (element.clientHeight !== 0) {
            console.log(element);
            console.log("Is ready");
            callback();
        } else {
            window.requestAnimationFrame(() => this.waitForElementHeight(element, callback));
        }
    }

    setItemRowHeight(container, masonryGridItem) {
        var rows = masonryGridItem.clientHeight / 10;
        container.setAttribute("style", `grid-row-end: span ${Math.floor(rows) + 1}`);
    }
}