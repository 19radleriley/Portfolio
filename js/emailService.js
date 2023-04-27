const SUCCESS = 1;
const FAIL = 0;
const SUCCESS_MESSAGE = "Email sent! I look forward to getting back to you!";
const FAIL_MESSAGE = "There was a problem when trying to send your email. Sorry for the inconvenience. Try again in a bit!";
const INVALID_EMAIL_MESSAGE = "I found an error in the email you gave me. Please double check and try again!";

emailjs.init("EzZR37KBmDmJUZMzQ");

class EmailService {

    // BUILDER FUNCTIONS

    setEmailInfoGetter(getEmailInfo) {
        this.getEmailInfo = getEmailInfo;
        return this;
    } 
    
    setMessageResponseLocation(messageResponseLocation) {
        this.messageResponseLocation = messageResponseLocation;
        return this;
    } 

    setClearInputLocation(clearInputLocation) {
        this.clearInputLocation = clearInputLocation;
        return this;
    }

    // BEHAVIOR FUNCTIONS
    
    sendEmail(e) {
        e.preventDefault();
        var emailInfo = this.getEmailInfo();
        var valid = this.validateInput(emailInfo);

        if (valid) {
            emailjs.send("service_4jyg8r2","template_0h5h0vy", emailInfo)
                .then(response => {
                    if (response.status == 200) {
                        this.displayResponseMessage(SUCCESS, SUCCESS_MESSAGE);
                        this.clearInput();
                    }
                    else {
                        this.displayResponseMessage(FAIL, FAIL_MESSAGE);
                    }
                });
        }
        else {
            this.displayResponseMessage(FAIL, INVALID_EMAIL_MESSAGE);
        }
    }

    clearInput() {
        this.clearInputLocation.each(function() {
            if (this.type != "submit") {
                this.value = "";
            }
        });
    }

    displayResponseMessage(type, message) {
        var msg = $(`<div>${message}</div>`);
        var msgType = "";
        if (type == SUCCESS) {
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
        this.messageResponseLocation.prepend(msg);
        msg.fadeIn(500, () => {
            setTimeout(() => {
                msg.fadeOut(500, () => {
                    msg.remove();
                });
            }, 10 * 1000);
        });
    }

    validateInput(emailInfo) {
        var emailSplit = emailInfo.from_email.split(/[@.]/);
        var valid = emailInfo.from_email && emailInfo.subject && emailInfo.body;
        var valid = emailSplit.length == 3;
        if (valid) {
            valid = emailSplit[0].length > 0;
            valid = valid && emailSplit[1].length > 0;
            valid = valid && emailSplit[2].length > 1;
        }

        return valid;
    }
}