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

const SUCCESS = 1;
const FAIL = 0;

$(() => {
    // JS for techs section
    sizeTechCards();
    window.onresize = sizeTechCards;
    $(".tech").on("click", function() {
        toggleFlipped(this); 
    });

    addSkills();

    $("#request").on("click", (e) => {
        e.preventDefault();

        let emailInfo = {
            from_email: document.getElementById("sender-email").value,
            subject: "Requesting Resume",
            body: "",
        };

        var valid = validateInput(emailInfo);

        if (valid) {
            emailjs.send("service_4jyg8r2","template_0h5h0vy", emailInfo)
                .then(response => {
                    if (response.status == 200) {
                        display(SUCCESS, "Email sent! I look forward to getting back to you!");
                        clearInput();
                    }
                    else {
                        display(SUCCESS, "Email failed to send");
                    }
                });
        }
        else {
            display(FAIL, "Invalid email format")
        }

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

function validateInput(emailInfo) {
    emailSplit = emailInfo.from_email.split(/[@.]/);
    if (emailSplit.length == 3) {
        var stillValid = emailSplit[0].length > 0;
        console.log(stillValid);
        stillValid = stillValid && emailSplit[1].length > 0;
        console.log(stillValid);
        stillValid = stillValid && emailSplit[2].length > 1;
        console.log(stillValid);
        return stillValid;    
    }
    return false;
}

function clearInput() {
    $("#sender-email").val("");
}

function display(pf, message) {
    var msg = $(`<div>${message}</div>`);
    var msgType = "";
    if (pf == SUCCESS) {
        msg.attr("class", "response-msg success");
        msgType = "success";
    }
    else {
        msg.attr("class", "response-msg fail");
        msgType = "fail";
    }

    // If there currently is a response, remove it quick
    var curr = $(".response-msg");
    if (curr) {
        curr.remove();
    }

    // Display the message for 5 seconds then remove it
    $("#resume").prepend(msg);
    msg.fadeIn(500, () => {
        setTimeout(() => {
            msg.fadeOut(500, () => {
                msg.remove();
            });
        }, 10 * 1000);
    });
}