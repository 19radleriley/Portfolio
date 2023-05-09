class MasonryGridItem {
    constructor() {
        // Wrap all images in an <a> tag
        this.container = document.createElement("a");
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
        this.container.setAttribute("href", src);
        this.img.setAttribute("class", "masonry-grid-item");
        this.container.appendChild(this.img);
        return this;
    }

    setLink(href) {
        this.container.setAttribute("href", href);
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
        var observer = new IntersectionObserver(entries => {
            entries.forEach(x => {
                if (x.isIntersecting) {
                    x.target.classList.add("show");
                    observer.unobserve(x.target);
                }
                else {
                    x.target.classList.remove("show");
                }
            });
        }, { threshold: 0.2 });

        items.forEach(i => {
            document.querySelector(this.location).appendChild(i.container);
            observer.observe(i.img);
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

export { MasonryGridItem };
export { MasonryGrid };