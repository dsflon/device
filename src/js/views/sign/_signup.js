import React from 'react';
import { Link } from "react-router-dom";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.stuer = localStorage.getItem(window.LSName);
        this.stuer = JSON.parse(this.stuer);
    }

    componentWillMount() {
        this.PageRedirect()
    }

    PageRedirect() {

        if( this.stuer && Object.values(this.stuer)[0] ) {
            // 既サインイン時
            location.replace('/');
        } else if( this.stuer && !Object.values(this.stuer)[0] ) {
            // サインアウト時
            location.replace('/signin');
        }

    }

    SignUp(e) {

        e.preventDefault();
        Sign.Up(this.state.inputData);
        location.replace('/')

    }

    render() {

        this.history = this.props.props.history;
        this.state = this.props.state;

        let btnValidate = this.props.BtnValidate();

        return (
            <div id="sign" className="contents">

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
                                onInput={this.props.InputDep.bind(this)} />
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
                                onInput={this.props.InputEmail.bind(this)} />
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
