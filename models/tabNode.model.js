export class TabNode {

    tab = null;
    next = null;
    prev = null;

    /** 
     * @description TabNode a class that represents the Tabs relationships be specifying the next
     * and previous Tabs for each active Node
     * @param {*} tab 
     * @param {*} nextTab 
     * @param {*} prevTab 
     */
    constructor(tab, nextTab, prevTab) {
        this.tab = tab;
        this.next = nextTab;
        this.prev = prevTab;
    }

}