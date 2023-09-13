export class Notification {
    private errors: NotificationError[]

    constructor() {
        this.errors = []
    }
    
    hasErrors() {
        return this.errors.length > 0
    }

    addError(error: NotificationError) {
        this.errors.push(error)
    }

    getErrorMessages() {
        let message = ""
        for (let e of this.errors) {
            message += `${e.context}: ${e.message},`
        }
        return message
    }
}
    type NotificationError = {
    context: string
    message: string
}