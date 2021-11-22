class BirthDateValidator {
    static errorMessage = 'Birth date fulfilled incorrectly, please try again.'

    static validate(message) {
        let birthDateArray = message.split('.')
        if (birthDateArray.length !== 3) return false
        for (let i = 0; i < birthDateArray.length; i++) {
            if (isNaN(birthDateArray[i])) return false
            if ((i === 0 || i === 1) && birthDateArray[i].length !== 2) return false
            if (i === 2 && birthDateArray[i].length !== 4) return false
        }
        return true
    }

    static getValidationMessage() {
        return BirthDateValidator.errorMessage
    }
}

module.exports = BirthDateValidator;