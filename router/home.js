import Home from '@/views/core/Home';
import Alerts from '@/views/alert/Alerts';
import Subscription from '@/views/core/Subscription';
import Account from '@/views/core/Account';
import PreLoader from '@/components/shared/PreLoader';

export default [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'alert-list',
        component: Alerts
      },
      {
        path: 'subscription',
        component: Subscription
      },
      {
        path: 'account',
        component: Account
      }
    ]
  },
  {
    path: '/test-alert/:alertId',
    name: 'TestAlert',
    component: PreLoader
  },
  {
    path: '/run-alert/:alertId',
    name: 'RunAlert',
    component: PreLoader
  },
  {
    path: '/run-alerts',
    name: 'RunAlerts',
    component: PreLoader
  }
]
