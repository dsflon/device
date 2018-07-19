import React from 'react';
import { Link } from "react-router-dom";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputData : {
                dep: null,
                email: null
            },
            error: {
                dep: null,
                email: null
            }
        };
    }

    componentWillMount() {

        this.storageUser = localStorage.getItem("deviceRentalSystem");

        if(this.storageUser) {
            location.replace('/')
        }

    }

    InputDep(e) {

        let target = e.currentTarget,
            key = target.name,
            val = target.value.toUpperCase();

        let validate = Validate.dep(val);

        let inputData = this.state.inputData;
            inputData[key] = val;

        let error = this.state.error;
            error[key] = validate !== true ? validate.message : null;

        this.setState(error);
        this.setState(inputData);

    }
    InputEmail(e) {

        let target = e.currentTarget,
            key = target.name,
            val = target.value.toLowerCase();

        let validate = Validate.mail(val);

        let error = this.state.error;
            error[key] = validate !== true ? validate.message : null;

        let inputData = this.state.inputData;
            inputData[key] = !error[key] ? val : null; // エラーだったらnullにする

        this.setState(error);
        this.setState(inputData);

    }

    BtnValidate() {

        let btnFlag = true;

        for (var key in this.state.inputData) {
            if(!this.state.inputData[key]) btnFlag = false;
        }

        return btnFlag;

    }

    SignUp(e) {

        e.preventDefault();
        Sign.In(this.state.inputData);

    }

    render() {

        this.history = this.props.props.history;

        let btnValidate = this.BtnValidate();

        return (
            <div id="sign">

                <h1 className="sign_ttl a-ttl a-ttl_l">Sign Up</h1>

                <form id="sign_form" ref="sign_form">

                    <div className="sing_label">
                        <h2>部署名</h2>
                        <div className="sing_input">
                            <input
                                name="dep"
                                input="email"
                                placeholder="EM1, TEC, etc."
                                ref="input_dep"
                                onInput={this.InputDep.bind(this)} />
                        </div>
                        <p className="sing_error">{this.state.error.dep}</p>
                    </div>

                    <div className="sing_label">
                        <h2>メールアドレス</h2>
                        <div className="sing_input">
                            <input
                                name="email"
                                input="email"
                                placeholder=""
                                ref="input_email"
                                onKeyUp={this.InputEmail.bind(this)} />
                            <span>@isobar.com</span>
                        </div>
                        <p className="sing_error">{this.state.error.email}</p>
                    </div>

                </form>

                <div className="sign_btns">
                    <div className="a-btn_col">
                        <Link
                            to="/signin"
                            className="f-font_s a-btn a-btn_line_red">
                            既にアカウントを<br />お持ちの方
                        </Link>
                        <button
                            disabled={ !btnValidate ? "disabled" : "" }
                            ref="sign_btn"
                            className="a-btn a-btn_red"
                            onClick={this.SignUp.bind(this)}>
                            Sign Up
                        </button>
                    </div>
                </div>

            </div>
        );

    }

}

export default SignUp;
