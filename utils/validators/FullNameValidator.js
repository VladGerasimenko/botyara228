class FullNameValidator {
    static errorMessage = 'FullName fulfilled incorrectly, please try again.'

    constructor() {
    }

    static validate(message) {
        let fullNameArray = message.split(' ')
        if (fullNameArray.length !== 3) return false
        for (let i = 0; i < fullNameArray.length; i++) {
            if (!isNaN(fullNameArray[i]) || fullNameArray[i].length === 0) return false
        }
        return true
    }

    static getValidationMessage() {
        return FullNameValidator.errorMessage
    }
}

module.exports = FullNameValidator;