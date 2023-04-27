$(() => {
    eService = new EmailService()
        .setMessageResponseLocation($("#contact"))
        .setClearInputLocation($("#contact-form > *"))
        .setEmailInfoGetter(() => {
            return {
                from_email: document.getElementById("sender-email").value,
                subject: document.getElementById("subject").value,
                body: document.getElementById("body").value,  
            }
        });

    
    $("#send").on("click", e => {
        eService.sendEmail(e);
    });
});