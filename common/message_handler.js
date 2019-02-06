import store from '@/store';

const showMessage = (error) => {
    store.state.error.hasError = true;
    store.state.error.errorBody = getMessage(error);
};

function getMessage(error) {
    if (error.response) {
        return error.response.statusText;
    } else {
        return 'Connection Refused!';
    }
}

export {
    showMessage
}
