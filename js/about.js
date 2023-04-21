let skills = [
    {
        name: "Frontend Development",
        rank: 85
    },
    {
        name: "Full Stack Development",
        rank: 70
    },
    {
        name: "Digital Illustration",
        rank: 50
    },
    {
        name: "Layout Design",
        rank: 40
    }
]

$(() => {
    // JS for techs section
    sizeTechCards();
    window.onresize = sizeTechCards;
    $(".tech").on("click", function() {
        toggleFlipped(this); 
    });

    addSkills();
});

function addSkills() {
    skills.forEach(s => {
        $("#skills-list").append($(`<li>${s.name}</li>`)
                                  .attr("class", "skill")
                                  .css("width", `${s.rank}%`));
    });
}

function toggleFlipped(elem) {
    if (elem.classList.contains("flipped")) {
        elem.classList.remove("flipped");
    }
    else {
        elem.classList.add("flipped");
    }
}

function sizeTechCards() {
    document.querySelectorAll(".tech").forEach(s => {
        s.style.height = `${s.clientWidth}px`;
    });    
}