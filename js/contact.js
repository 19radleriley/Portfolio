const SUCCESS = 1;
const FAIL = 0;

$(() => {
    $("#send").on("click", (e) => {
        e.preventDefault();

        let emailInfo = {
            from_email: document.getElementById("sender-email").value,
            subject: document.getElementById("subject").value,
            body: document.getElementById("body").value,
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
                        display(SUCCESS, "I was unable to send your email and am sorry for the inconvenience.");
                    }
                });
        }
        else {
            display(FAIL, "I found an error with the info you gave me. Please double check and try again.")
        }

    });
});

function clearInput() {
    $("#sender-email").val("");
    $("#subject").val("");
    $("#body").val("");
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
    $("#contact").prepend(msg);
    msg.fadeIn(500, () => {
        setTimeout(() => {
            msg.fadeOut(500, () => {
                msg.remove();
            });
        }, 10 * 1000);
    });
}

function validateInput(emailInfo) {
    emailSplit = emailInfo.from_email.split(/[@.]/);
    console.log(emailSplit);
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