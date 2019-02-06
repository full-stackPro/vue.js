import Alert from '@/views/alert/Alert';
import TriggersView from '@/views/alert/Triggers';
import Triggers from '@/components/alert/trigger/Triggers';
import Trigger from '@/components/alert/trigger/Trigger';
import RecipientsView from '@/views/alert/Recipients';
import Recipients from '@/components/alert/distribution/Recipients';
import AlertMessage from '@/components/alert/AlertMessage';
import AlertActivation from '@/components/alert/AlertActivation';
import RecipientsForm from '@/components/alert/distribution/RecipientsForm';

export default [
    {
        path: '/alerts/:alertId',
        component: Alert,
        children: [
            {
                path: '',
                redirect: 'triggers'
            },
            {
                path: 'triggers',
                component: TriggersView,
                children: [
                    {
                        path: '',
                        component: Triggers
                    },
                    {
                        path: ':triggerId',
                        component: Trigger
                    }
                ]
            },
            {
                path: 'recipients',
                component: RecipientsView,
                children: [
                    {
                        path: '',
                        component: Recipients
                    },
                    {
                        path: ':distributionMethod',
                        component: RecipientsForm
                    }
                ]
            },
            {
                path: 'message',
                component: AlertMessage
            },
            {
                path: 'activation',
                component: AlertActivation
            }
        ]
    }
]
