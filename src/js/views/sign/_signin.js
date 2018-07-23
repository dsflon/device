import React from 'react';
import { Link } from "react-router-dom";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.stuer = localStorage.getItem(window.LSUser);
        this.stuer = JSON.parse(this.stuer);

    }

    componentWillMount() {
        this.PageRedirect()
    }

    componentDidMount() {

        if(this.stuer) {
            let stuer = Object.keys(this.stuer)[0];
            this.value = stuer.replace("_", ".");
            this.refs.input_email.value = this.value;
            this.props.InputEmail(this.refs.input_email)
        }
    }

    PageRedirect() {

        if( this.stuer && Object.values(this.stuer)[0] ) {
            location.replace('/');
        }

    }

    Remove(e) {
        e.preventDefault();
        window.Loading.Show();
        Sign.Remove(() => {
            window.Loading.Hide();
            location.replace('/signup')
        });
    }

    SignIn(e) {
        e.preventDefault();
        window.Loading.Show();

        Sign.In(this.state.inputData, () => {
            window.Loading.Hide();
        });
    }

    render() {

        this.history = this.props.props.history;
        this.state = this.props.state;

        let btnValidate = this.props.BtnValidate();

        return (
            <div id="sign" className="contents">

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
                        {(() => {

                            if( this.value ) {
                                return <button className="a-btn f-font_s" onClick={this.Remove.bind(this)}>アカウントを<br />削除する</button>
                            } else {
                                return <Link to="/signup" className="a-btn">Back</Link>
                            }

                        })()}
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
