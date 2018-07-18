import React from 'react';
import { Link } from "react-router-dom";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    SignIn(e) {

        e.preventDefault();

        this.history.push("/")

    }

    render() {

        this.history = this.props.props.history;

        console.log(this.history);

        return (
            <div id="sign">

                <h1 className="a-ttl a-ttl_l a-ttl_mb">Sign Up</h1>

                <form id="singup">

                    <label className="sing_label">
                        <h2>部署名</h2>
                        <div className="sing_input">
                            <input name="dep" input="email" placeholder="EM1, TEC, etc." />
                        </div>
                    </label>

                    <label className="sing_label">
                        <h2>メールアドレス</h2>
                        <div className="sing_input">
                            <input name="email" input="email" placeholder="" />
                            <span>@isobar.com</span>
                        </div>
                    </label>

                </form>

                <div className="sign_btns">
                    <div className="a-btn_col">
                        <Link
                            to="/signin"
                            className="f-font_s a-btn a-btn_line_red">
                            既にアカウントを<br />お持ちの方
                        </Link>
                        <button
                            disabled="disabled"
                            className="a-btn a-btn_red"
                            onClick={this.SignIn.bind(this)}>
                            Sign Up
                        </button>
                    </div>
                </div>

            </div>
        );

    }

}

export default SignUp;
