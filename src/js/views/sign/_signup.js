import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.stuser = localStorage.getItem(window.LSUser);
        this.stuser = JSON.parse(this.stuser);
    }

    componentWillMount() {
        this.PageRedirect()
    }

    componentDidMount() {
        window.Loading.Hide();
    }

    PageRedirect() {

        if( this.stuser && Object.values(this.stuser)[0] ) {
            // 既サインイン時
            location.replace('/');
            // this.history.replace('/')
        } else if( this.stuser && !Object.values(this.stuser)[0] ) {
            // サインアウト時
            location.replace('/signin');
            // this.history.replace('/signin')
        }

    }

    SignUp(e) {

        e.preventDefault();

        Sign.Up(this.state.inputData, () => {
            location.replace('/');
            this.history.replace('/')
        });

    }

    GuestSignIn(e) {
        e.preventDefault();

        this.refs.input_dep.value = "GST";
        this.refs.input_email.value = "guest."+ new Date().getTime();

        this.props.InputDep(this.refs.input_dep)
        this.props.InputEmail(this.refs.input_email)

    }

    render() {

        this.history = this.props.props.history;
        this.state = this.props.state;

        let btnValidate = this.props.BtnValidate();

        return (
            <div id="sign" className="contents">

                <Helmet title="Sign Up"></Helmet>
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
                                placeholder="taro.tsukiji"
                                onInput={this.props.InputEmail.bind(this)} />
                            <span>@test.com</span>
                        </div>
                        <p className="sing_error">{this.state.error.email}</p>
                    </div>

                    <button
                        onClick={this.GuestSignIn.bind(this)}
                        style={{
                            display: "inherit",
                            margin: "30px auto 0",
                            padding: "10px 0",
                            textAlign: "center",
                            textDecoration: "underline",
                            color: "#c43535"
                        }}>
                        Guest sign in
                    </button>

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
