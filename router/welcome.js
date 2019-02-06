import Welcome from '@/views/core/Welcome';
import QuickStart from '@/views/core/QuickStart';

export default [
    {
        path: '',
        redirect: 'quick-start'
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/quick-start',
        name: 'QuickStart',
        component: QuickStart
    }
]