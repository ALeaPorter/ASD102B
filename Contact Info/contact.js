// Changed import
import Contact, {getContact, saveContact, clearContact} from 'contact';

const getElement = selector => document.querySelector(selector);

const displayContact = () => {
    const contact = getContact();
    getElement("#name").value = contact.name;
    getElement("#email").value = contact.email;
    getElement("#phone").value = contact.phone;
    getElement("#zip").value = contact.zip;
    getElement("#dob").value = contact.dob.toUniversalFormatString();
};
const displayConfirmPage = () => {
    const contact = getContact();
    getElement("#lbl_name").textContent = contact.name;
    getElement("#lbl_email").textContent = contact.email;
    getElement("#lbl_phone").textContent = contact.phone;
    getElement("#lbl_zip").textContent = contact.zip;
    getElement("#lbl_dob").textContent = contact.dob.toDateString();
};
const clearMessages = () => {
    const inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        const span = input.nextElementSibling;
        if (span) span.textContent = "";
    }
    inputs[0].focus();
};

document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("form");

    if (form) {  // index.html
        // turn off default HTML validation messages
        form.noValidate = true;

        // attach invalid event handler for form controls
        for (let element of form.elements) {
            element.addEventListener("invalid", evt => {
                const elem = evt.currentTarget;
                const msg = elem.title ? elem.title : elem.validationMessage;
                const span = elem.nextElementSibling;
                if (span) span.textContent = msg;
            });
        }
        // display data from web storage in contact form
        displayContact();

        form.addEventListener("submit", evt => {
            clearMessages();  

            const contact = createContact(getElement("#name").value, getElement("#email").value,
                getElement("#phone").value, getElement("#zip").value, getElement("#dob").value);

            // validate user has entered an email or a phone number
            let msg = (contact.email == "" && contact.phone == "") ? "Please enter an email or phone." : "";
            getElement("#email").setCustomValidity(msg);

            // validate dob
            if (contact.dob.isInvalid) {
                msg = "Please enter a valid DOB."
            } else {
                msg = (contact.dob.isNotInPast) ? "DOB must be in the past." : "";
            }
            getElement("#dob").setCustomValidity(msg);

            // validate form
            if(!form.checkValidity()) { 
                evt.preventDefault();
            } else {
                console.log("Saving contact:", contact);
                saveContact(contact);
            }
        });

        form.addEventListener("reset", () => {
            clearMessages();
            clearContact();
        });
    } else {     // confirm.html
        // display data from web storage in confirm page labels
        displayConfirmPage();
    }
}); 