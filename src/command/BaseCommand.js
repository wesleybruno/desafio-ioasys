class BaseCommand {

    constructor() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
    addError(message) {
        this.errors.push(message);
        return null;
    }

    async handleException(ex) {
        console.error(ex)

        const errorStack = new Error();
        console.error(errorStack.stack)

        switch (ex.name) {
            case 'MongoError':
                return this.addError(ex.message);
            default:
                throw ex;
        }
    }

    static async handleException(ex){
        const errors = []
        console.error(ex)

        const errorStack = new Error();
        console.error(errorStack.stack)

        return {
            r: false,
            errors: []
        }
    }

}

module.exports =  BaseCommand