import React from 'react';
import { Link } from "react-router-dom";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        // this.inputData = {
        //     dep: null,
        //     email: null
        // };

        this.state = {
            inputData : {
                dep: null,
                email: null
            }
        };
    }

    componentDidMount() {
    }

    InputDep(e) {

        let target = e.currentTarget,
            key = target.name,
            val = target.value.toUpperCase();

        let inputData = this.state.inputData;
            inputData[key] = val;

        this.setState(inputData);

    }
    InputEmail(e) {

        let target = e.currentTarget,
            key = target.name,
            val = target.value;

        let inputData = this.state.inputData;
            inputData[key] = val;

        this.setState(inputData);

    }

    BtnValidate() {

        let btnFlag = true;

        for (var key in this.state.inputData) {
            if(!this.state.inputData[key]) btnFlag = false;
        }

        return btnFlag;

    }

    SignIn(e) {

        e.preventDefault();

        let signinData = {},
            inputData = this.state.inputData;

        let key = inputData.email.replace( '.', '_' ),
            name = inputData.email.replace( '.', ' ' );

        signinData[key] = {
            "dep": inputData.dep,
            "name": name
        }
        console.log( signinData );

        localStorage.setItem("deviceRentalSystem", JSON.stringify(signinData));
        // this.history.push("/")
        location.replace('/')

    }

    render() {

        this.history = this.props.props.history;

        let btnValidate = this.BtnValidate();

        return (
            <div id="sign">

                <h1 className="a-ttl a-ttl_l a-ttl_mb">Sign In</h1>

                <form id="sign_form" ref="sign_form">

                    <label className="sing_label">
                        <h2>部署名</h2>
                        <div className="sing_input">
                            <input
                                name="dep"
                                input="email"
                                placeholder="EM1, TEC, etc."
                                ref="input_dep"
                                onInput={this.InputDep.bind(this)} />
                        </div>
                    </label>

                    <label className="sing_label">
                        <h2>メールアドレス</h2>
                        <div className="sing_input">
                            <input
                                name="email"
                                input="email"
                                placeholder=""
                                ref="input_email"
                                onInput={this.InputEmail.bind(this)} />
                            <span>@isobar.com</span>
                        </div>
                    </label>

                </form>

                <div className="sign_btns">
                    {/*<div className="a-btn_col">*/}
                        {/*<Link
                            to="/signin"
                            className="f-font_s a-btn a-btn_line_red">
                            既にアカウントを<br />お持ちの方
                        </Link>*/}
                        <button
                            disabled={ !btnValidate ? "disabled" : "" }
                            ref="sign_btn"
                            className="a-btn a-btn_red"
                            onClick={this.SignIn.bind(this)}>
                            Sign In
                        </button>
                    {/*</div>*/}
                </div>

            </div>
        );

    }

}

export default SignIn;
