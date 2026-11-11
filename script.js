
const contactForm = document.querySelector(".contact-form");
const submitButton = document.querySelector(".contact-submit");

const contactStatus = document.querySelector("#contact-status");

if (contactForm && submitButton && contactStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        contactStatus.hidden = true;
        contactStatus.className = "contact-status";
        contactStatus.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            const result = await response.json();

            if (response.ok) {
                contactForm.reset();

                contactStatus.textContent =
                    "Thank you for reaching out! Your message has been sent successfully. I'll get back to you soon.";

                contactStatus.classList.add("is-success");
            } else {
                const errorMessage =
                    result.errors?.map(error => error.message).join(", ") ||
                    "Something went wrong. Please try again later.";

                contactStatus.textContent = errorMessage;
                contactStatus.classList.add("is-error");
            }
        } catch (error) {
            contactStatus.textContent =
                "Unable to send your message. Please check your internet connection and try again.";

            contactStatus.classList.add("is-error");
        } finally {
            contactStatus.hidden = false;
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}
