export class Trigger {

    alertId = null;
    name = '';
    description = '';

    constructor(alertId, name, description) {
        this.alertId = alertId;
        this.name = name;
        this.description = description;
    }

}