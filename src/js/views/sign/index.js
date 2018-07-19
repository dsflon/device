import React from 'react';

import SignUp from './_signup'
import SignIn from './_signin'
import EditProfile from './_edit_profile'
import Validate from '../../common/_validate';

class Signed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signup: {
                inputData : { dep: null, email: null },
                error: { dep: null, email: null }
            },
            edit_profile: {
                inputData : { dep: null, email: null },
                error: { dep: null, email: null }
            },
            signin: {
                inputData : { email: null },
                error: { email: null }
            }
        };
    }

    componentWillMount() {
    }
    componentDidUpdate() {
    }

    InputDep(e) {

        let target = e.currentTarget ? e.currentTarget : e,
            key = target.name,
            val = target.value.toUpperCase();

        let validate = Validate.dep(val);

        let inputData = this.state[this.page].inputData;
            inputData[key] = val;

        let error = this.state[this.page].error;
            error[key] = validate !== true ? validate.message : null;

        this.setState(error);
        this.setState(inputData);

    }
    InputEmail(e) {

        let target = e.currentTarget ? e.currentTarget : e,
            key = target.name,
            val = target.value.toLowerCase();

        let validate = Validate.mail(val);

        let error = this.state[this.page].error;
            error[key] = validate !== true ? validate.message : null;

        let inputData = this.state[this.page].inputData;
            inputData[key] = !error[key] ? val : null; // エラーだったらnullにする

        this.setState(error);
        this.setState(inputData);

    }

    BtnValidate() {

        let btnFlag = true;

        for (var key in this.state[this.page].inputData) {
            if(!this.state[this.page].inputData[key]) btnFlag = false;
        }

        return btnFlag;

    }

    render() {

        let { match: { params: { page } } } = this.props.props;
        this.page = page;

        switch (this.page) {

            case 'signup':
            return <SignUp
                props={this.props.props}
                state={this.state[this.page]}
                InputDep={this.InputDep.bind(this)}
                InputEmail={this.InputEmail.bind(this)}
                BtnValidate={this.BtnValidate.bind(this)} />

            case 'signin':
            return <SignIn
                props={this.props.props}
                state={this.state[this.page]}
                InputEmail={this.InputEmail.bind(this)}
                BtnValidate={this.BtnValidate.bind(this)} />

            case 'edit_profile':
            return <EditProfile
                props={this.props.props}
                state={this.state[this.page]}
                InputDep={this.InputDep.bind(this)}
                InputEmail={this.InputEmail.bind(this)}
                BtnValidate={this.BtnValidate.bind(this)} />

        }

    }

}


export default Signed;
