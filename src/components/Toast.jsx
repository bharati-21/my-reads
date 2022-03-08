import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Toast = (props) => {
    const {toastTheme, toastText, toastDispatch} = props;
    return (
        <div className={`toast ${toastTheme}`}>
            <p className="toast-text">{toastText}</p>
            <span className="icon icon-close" onClick={e => toastDispatch({type: 'HIDE_TOAST'})}>
                <CloseIcon  />    
            </span>
        </div>
    )
}

export {Toast};