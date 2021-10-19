import React from "react";
import ReactDOM from "react-dom";
import "../../../../scss/components/custom-modal.scss";
import {Children} from "./children";

export class CustomModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {show: (props.show) ? props.show : false};

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onClickContent = this.onClickContent.bind(this);
        this.onClickBackdrop = this.onClickBackdrop.bind(this);

        this.modal = React.createRef();
        this._container = document.createElement('div');
        this._body = document.getElementsByTagName('body')[0];
    }

    componentDidMount() {
        this._body.appendChild(this._container);
    }

    componentWillUnmount() {
        this._body.removeChild(this._container);
    }

    async close(event) {
        if (event) event.stopPropagation();
        const {onClose} = this.props;
        const body = document.querySelector('body');
        this.modal.current.classList.add('modal-hidden');
        window.setTimeout(async () => {
            if (typeof onClose === 'function' && !await onClose()) return;
            this.setState({show: false, closeClicked: true});
            body.setAttribute('style', '');
            body.classList.remove('body-custom-modal-opened');
        }, 300);

    }

    open() {
        const body = document.querySelector('body');
        body.classList.add('body-custom-modal-opened');
        body.setAttribute('style', 'overflow:hidden');
        this.setState({show: true, hideClicked: undefined});
    }

    onClickBackdrop(event) {
        event.stopPropagation();
        if (event.target !== this.modal.current) return;
        this.close(event);
    }

    onClickContent(event) {

    }

    render() {

        const show = this.state.show && !this.state.hideClicked;

        let cls = 'custom-element-modal '
        cls += (this.props.className) ? this.props.className : '';

        if (show) cls += ' show-modal';
        const output = [];

        if (show) {
            output.push(
                <div key="modal-content-wrapper" className="modal-wrapper">
                    <div onClick={this.onClickContent}
                         className="modal-content">
                        <Children {...this.props} close={this.close} key="children-content"/>
                    </div>
                </div>
            );
        }

        return ReactDOM.createPortal(
            <div
                ref={this.modal} onClick={this.onClickBackdrop}
                className={cls}>{output}</div>,
            this._container
        );

    }

}
