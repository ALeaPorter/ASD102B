import Dob from 'dob';

// Made contact into a class

export default class Contact{
    constructor(name="", email="", phone="", zip="", dob="") {
        this.name = String(name).trim();
        this.email = String(email).trim();
        this.phone = String(phone).trim();
        this.zip = String(zip).trim();

        this.dob = dob instanceof Dob ? dob : new Dob(dob);
    }
}
//public
export const clearContact = () => {
    sessionStorage.removeItem("contact");
};
export const saveContact = contact => {
    if (!(contact instanceof Contact)) {
        throw new TypeError(
            "saveContact requires a Contact object"
        );
    } else {
        sessionStorage.setItem("contact", JSON.stringify(contact));
    }
};
export const getContact = () => {
    const json = sessionStorage.getItem("contact");
    if (!json) {
        return new Contact();
    }
    return JSON.parse(json);
};