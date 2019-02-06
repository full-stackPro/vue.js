import Login from '@/views/auth/Login';
import SignUp from '@/views/auth/SignUp';
import ForgotPassword from '@/views/auth/ForgotPassword';
import EmailSent from '@/views/auth/EmailSent';
export default [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/email-sent',
        name: 'EmailSent',
        component: EmailSent
    }
]
