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

    componentDidUpdate() {

        if (this.state.show) {
            document.querySelector('body').setAttribute('style', 'overflow:hidden');
        }
    }

    componentDidMount() {

        if (this.state.show) {
            document.querySelector('body').setAttribute('style', 'overflow:hidden');
        }

        this._body.appendChild(this._container);
    }

    componentWillUnmount() {
        this._body.removeChild(this._container);
    }

    async close(event) {
        const {onClose} = this.props;
        document.querySelector('body').setAttribute('style', '');
        if (onClose && typeof onClose === 'function') return onClose(event);
        this.setState({show: false, closeClicked: true});
    }

    open() {
        document.querySelector('body').setAttribute('style', 'overflow:hidden');
        this.setState({show: true, hideClicked: undefined});
    }

    onClickBackdrop(event) {
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
                <div key="modal-content" onClick={this.onClickContent} className="modal-content">
                    <Children {...this.props} close={this.close} key="children-content"/>
                </div>
            );
        }

        return ReactDOM.createPortal(
            <div>
                <div ref={this.modal} onClick={this.onClickBackdrop} className={cls}>{output}</div>
            </div>,
            this._container
        );

    }

}
