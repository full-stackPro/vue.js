import { Tab } from '@/models/tab.model';
import { TabNode } from '@/models/tabNode.model';

export default {
    namespaced: true,
    state: {
        homeTabs: [], // Array of TabNode
        alertTabs: [], // Array of TabNode
    },
    mutations: {
        setAlerts(state, alerts) {
            state.alerts = alerts;
        }
    },
    actions: {
        /**
         * @description initTabs generate Tabs including routes
         */
        initTabs({ state }) {
            // Alerts Tab Objects
            const triggerTab = new Tab('triggers', 'triggers');
            const recipientsTab = new Tab('recipients', 'recipients');
            const messageTab = new Tab('message', 'message');
            const activationTab = new Tab('activation', 'activation');

            // alerts Tab Nodes
            const triggerNode = new TabNode(triggerTab, recipientsTab, null);
            const recipientsNode = new TabNode(recipientsTab, messageTab, triggerTab);
            const messageNode = new TabNode(messageTab, activationTab, recipientsTab);
            const activationNode = new TabNode(activationTab, null, messageTab);

            // Alerts Tab Objects
            const alertListTab = new Tab('alert-list', 'triggers');
            const subscriptionTab = new Tab('subscription', 'recipients');
            const accountTab = new Tab('account', 'account');

            // alerts Tab Nodes
            const alertListNode = new TabNode(alertListTab, subscriptionTab, null);
            const subscriptionNode = new TabNode(subscriptionTab, accountTab, alertListTab);
            const accountNode = new TabNode(accountTab, null, subscriptionTab);

            // Updating The State
            state.homeTabs.push(alertListNode, subscriptionNode, accountNode);
            state.alertTabs.push(triggerNode, recipientsNode, messageNode, activationNode);
        }
    }
}


