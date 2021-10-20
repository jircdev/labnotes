import React from "react";
import ReactDOM from "react-dom";
import "../../../../scss/components/custom-modal.scss";
import {Children} from "./children";

export function CustomModal(props) {

    const [state, setState] = React.useState({show: props?.show});
    const modal = React.useRef();
    const container = document.createElement('div');

    const close = async event => {
        if (event) event.stopPropagation();
        const {onClose} = props;
        const body = document.querySelector('body');
        modal.current.classList.add('modal-hidden');
        window.setTimeout(async () => {
            if (typeof onClose === 'function' && !await onClose()) return;
            setState({show: false, closeClicked: true});
            body.setAttribute('style', '');
            body.classList.remove('body-custom-modal-opened');
        }, 300);

    }

    const onClickBackdrop = event => {
        event.stopPropagation();
        if (event.target !== modal.current) return;
        close(event);
    }
    React.useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(container);
        return () => body.removeChild(container);
    }, []);

    const show = state.show && !state.hideClicked;

    let cls = 'custom-element-modal '
    cls += (props.className) ? props.className : '';

    if (show) cls += ' show-modal';
    const output = [];

    if (show) {
        output.push(
            <div key="modal-content-wrapper" className="modal-wrapper">
                <div className="modal-content">
                    <Children {...props} close={close} key="children-content"/>
                </div>
            </div>
        );
    }

    return ReactDOM.createPortal(
        <div
            ref={modal} onClick={onClickBackdrop}
            className={cls}>{output}</div>,
        container
    );

}



