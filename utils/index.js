const isValidId = (Id) => (Id != 'new' && Id != 'edit');

const isValidUrl = (url) => {
    var regexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return !url || regexp.test(url);
}

const isValidEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

const isValidPhoneNumber = (number) => {
    // const regexp = /^[+]?\d{1,2|3} ?(\d{3})(?=.*?[1-9])[0-9()-]\d{1,8}$/g;
    const regexp1 = /^\+?([0-9]{1})\)?[- ]?([0-9]{3})[- ]?([0-9]{11})$/;
    const regexp2 = /^\+?([0-9]{2})\)?[- ]?([0-9]{3})[- ]?([0-9]{10})$/;
    const regexp3 = /^\+?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{9})$/;

    return regexp1.test(String(number)) || regexp2.test(String(number)) || regexp3.test(String(number));
}

/**
 * @description isValidCollection validates current collection by type, types are {email, phone}
 * @param {Array<any>} collection 
 * @param {String} type 
 */
const isValidCollection = (collection, type) => {
    let valid = false;
    if (!collection[0]) return true;
    if (type === 'emails') {
        for (let elm of collection) {
            if (isValidEmail(elm)) {
                valid = true;
            } else {
                valid = false;
                return valid;
            }
        }
    } else {
        for (let elm of collection) {
            if (isValidPhoneNumber(elm)) {
                valid = true;
            } else {
                valid = false;
                return valid;
            }
        }
    }
    return valid;
}




export {
    isValidId,
    isValidUrl,
    isValidPhoneNumber,
    isValidEmail,
    isValidCollection
}