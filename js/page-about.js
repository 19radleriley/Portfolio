class Skill {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }
}

let skills = [
    new Skill("Frontend Development", 85),
    new Skill("Fullstack Development", 70),
    new Skill("Digital Illustration", 50),
    new Skill("Layout Design", 40)
]

$(() => {
    // JS for techs section
    sizeTechCards();
    window.onresize = sizeTechCards;
    $(".tech").on("click", function() {
        toggleFlipped(this); 
    });

    addSkills();

    eService = new EmailService()
        .setMessageResponseLocation($("#resume"))
        .setClearInputLocation($("#request-form > *"))
        .setEmailInfoGetter(() => {
            return {
                from_email: document.getElementById("sender-email").value,
                subject: "Requesting Resume",
                body: "Requesting Resume",  
            }
        });

    
    $("#request").on("click", e => {
        eService.sendEmail(e);
    });
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