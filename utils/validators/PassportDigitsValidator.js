class PassportDigitsValidator {
    static errorMessage = 'Passport digits fulfilled incorrectly, please try again.'

    static validate(message) {
        let passportDigitsArray = message.split(' ')
        if (passportDigitsArray.length !== 2) return false
        for (let i = 0; i < passportDigitsArray.length; i++) {
            if (isNaN(passportDigitsArray[i])) return false
            if (i === 0 && passportDigitsArray[i].length !== 2) return false
            if (i === 1 && passportDigitsArray[i].length !== 3) return false
        }
        return true
    }

    static getValidationMessage() {
        return PassportDigitsValidator.errorMessage
    }
}

module.exports = PassportDigitsValidator;