class MasonryGridItem {
    constructor() {
        this.container = document.createElement("div");
        this.container.setAttribute("class", "masonry-grid-item-container");
        this.tags = [];
    }

    setAltText(txt) {
        this.txt = txt;
        this.img.setAttribute("alt", txt);
        return this;
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

        this.setItemRowHeightsAll(this.firstTime);

        $(window).off();
        $(window).on("resize", () => {
            this.setItemRowHeightsAll();
        });
    }

    removeAllItems() {
        document.querySelectorAll(`${this.location} > *`).forEach(e => {
            e.remove();
        });
    }

    setItemRowHeightsAll() {
        document.querySelectorAll(`${this.location} .masonry-grid-item`).forEach(t => {
            var container = t.closest(".masonry-grid-item-container");

            this.waitForElementHeight(t, () => {
                this.setItemRowHeight(container, t);
            });
        });
    }

    // Wait for browser to fully render the image
    waitForElementHeight(element, callback) {
        if (element.clientHeight !== 0) {
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