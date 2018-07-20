import React from 'react';
import { Link } from "react-router-dom";

import Sign from '../../common/_sign';
import Validate from '../../common/_validate';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.stuer = localStorage.getItem(window.LSName);
        this.stuer = JSON.parse(this.stuer);
    }

    componentDidMount() {

        if(this.stuer) {
            let key = Object.keys(this.stuer)[0],
                dep = this.stuer[key].dep,
                email = key.replace("_", ".");

            this.refs.input_dep.value = dep;
            this.refs.input_email.value = email;
            this.props.InputEmail(this.refs.input_email);
            this.props.InputDep(this.refs.input_dep);
        }
    }

    Save(e) {

        e.preventDefault();
        Sign.Up(this.state.inputData);
        this.history.push("/");

    }

    render() {

        this.history = this.props.props.history;
        this.state = this.props.state;

        let btnValidate = this.props.BtnValidate();

        return (
            <div id="sign" className="contents">

                <h1 className="sign_ttl a-ttl a-ttl_l">Edit profile</h1>

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
                                disabled
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
                            to="/"
                            className="a-btn">
                            Back
                        </Link>
                        <button
                            disabled={ !btnValidate ? "disabled" : "" }
                            ref="sign_btn"
                            className="a-btn a-btn_red"
                            onClick={this.Save.bind(this)}>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        );

    }

}

export default EditProfile;
