import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Fetch from '../../common/_fetch';
import Items from './_items';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.storageUser = localStorage.getItem("deviceRentalSystem");
        // localStorage.setItem("deviceRentalSystem", JSON.stringify({
        //     "daiki_saito": {
        //         "dep": "TEC",
        //         "name": "斎藤 大輝"
        //     }
        // }));
    }

    componentDidMount() {

        if(this.storageUser) {
            this.storageUser = JSON.parse(this.storageUser);
            window.actions.User(this.storageUser);
        } else {
            console.log("サインインしてください。");
            return false;
        }

        Fetch();
    }

    componentDidUpdate() {
    }

    Success() {
        return !(!this.state.list || !this.state.user)
    }

    render() {

        this.state = this.props.state;
        this.history = this.props.history;

        window.actions = this.props.actions;

        let Item = this.Success() ? <Items state={this.state} /> : null;

        return (
            <div className="page">
                {Item}
            </div>
        );

    }

}

const MapStateToProps = (state,ownProps) => {
    return { state: state };
}
const MapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(ActionCreators, dispatch) };
}

const Home = connect(
    MapStateToProps,
    MapDispatchToProps
)(App);

export default Home;
