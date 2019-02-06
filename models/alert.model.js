export class Alert {

    name = null;
    message = null;
    message = null;
    trackedlink = null;
    maxsendfrequency = null;
    active = false;
    draft = true;
    distribution = {
        emails: [],
        sms: []
    };

    /**
     * @description Alert a class that represents the Alert Object, Mainly used to initialize full Alert
     * Object of any property is undefined to prevent binding issues with the application state.
     * @param {String} id 
     * @param {String} name 
     * @param {String} message 
     * @param {String} trackedlink 
     * @param {String} maxsendfrequency 
     * @param {Boolean} active 
     * @param {Boolean} draft 
     * @param {*} distribution 
     */
    constructor(id, name, message, trackedlink, maxsendfrequency, active, draft, distribution) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.trackedlink = !trackedlink ? '' : trackedlink;
        this.maxsendfrequency = !maxsendfrequency ? '' : maxsendfrequency;
        this.active = active;
        this.draft = draft;
        this.distribution = !distribution ? distribution = { emails: [], sms: [] } : distribution;
    }

}