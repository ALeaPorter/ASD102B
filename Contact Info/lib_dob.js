export default class Dob extends Date {
    constructor(universalFormatString) {
        if (universalFormatString.includs("T")) {
            universalFormatString += "T00:00:00";  // add time to correct UTC/local time issue
        }
        // call constructor of Date superclass
        super(universalFormatString);
        this.#makeDateOnly(this);
    }

    #makeDateOnly(value) {
        if (value instanceof Date) {
            value.setHours(0);
            value.setMinutes(0);
            value.setSeconds(0);
            value.setMilliseconds(0);
        }
    }

    #padNum(num) {
        return num.toString().padStart(2, "0");
    }

    get isInvalid() {
        return this.toString() == "Invalid Date";
    }

    get isNotInPast() {
        const today = new Date();
        this.#makeDateOnly(today);
        return today <= this;
    }

    toUniversalFormatString() {
        return (this.isInvalid) ? "":
            `${this.getFullYear()}-${this.#padNum(this.getMonth() + 1)}-${this.#padNum(this.getDate())}`;
    }

    // override methhod of Date superclass
    toDateString() {
        return (this.isInvalid) ? "" : super.toDateString();
    }
}