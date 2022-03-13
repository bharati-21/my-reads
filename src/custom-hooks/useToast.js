import { useReducer } from 'react';

const useToast = () => {
    const toastReducer = (prevToast, action) => {

        const {type} = action;
        
        switch(type){
            case 'SHOW_TOAST':
                const {payload} = action;
                const {toastText, toastTheme} = payload;

                return {...prevToast, showToast: true, toastText, toastTheme };
            case 'HIDE_TOAST':
                return {...prevToast, showToast: false, toastText:'', toastTheme:'none' };
            default:
                return prevToast;
        }
    }

    const intitalToastState = {
        showToast: false, 
        toastText: '', 
        toastTheme: 'none'
    };

    const [toastState, toastDispatch] = useReducer(toastReducer, intitalToastState);

    return {...toastState, toastDispatch};
}

export {useToast};