import React from 'react';
import { Link } from "react-router-dom";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
    }

    SignIn(e) {

        e.preventDefault();
        // Sign.In(this.state.inputData);

        alert("sing In 処理")

    }

    render() {

        this.history = this.props.props.history;
        this.state = this.props.state;

        let btnValidate = this.props.BtnValidate();

        return (
            <div id="sign">

                <h1 className="sign_ttl a-ttl a-ttl_l">Sign In</h1>

                <form id="sign_form" ref="sign_form">

                    <div className="sing_label">
                        <h2>メールアドレス</h2>
                        <div className="sing_input">
                            <input
                                name="email"
                                input="email"
                                placeholder=""
                                ref="input_email"
                                onInput={this.props.InputEmail.bind(this)} />
                            <span>@isobar.com</span>
                        </div>
                        <p className="sing_error">{this.state.error.email}</p>
                    </div>

                </form>

                <div className="sign_btns">
                    <div className="a-btn_col">
                        <Link
                            to="/signup"
                            className="a-btn">
                            Back
                        </Link>
                        <button
                            disabled={ !btnValidate ? "disabled" : "" }
                            ref="sign_btn"
                            className="a-btn a-btn_red"
                            onClick={this.SignIn.bind(this)}>
                            Sign In
                        </button>
                    </div>
                </div>

            </div>
        );

    }

}

export default SignIn;
