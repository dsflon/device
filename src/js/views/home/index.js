import React from 'react';
import { Link, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Fetch from '../../common/_fetch';
import Header from './_header';
import Items from './_items';
import ShowRental from './_rental';

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
        this.history = this.props.history;
        window.actions = this.props.actions;

        window.actions.User({
            "daiki_saito": {
                "dep": "TEC",
                "name": "斎藤 大輝"
            }
        });
        Fetch();

    }

    componentDidMount() {

        // if(this.storageUser) {
        //     this.storageUser = JSON.parse(this.storageUser);
        //     window.actions.User(this.storageUser);
        // } else {
        //     console.log("サインインしてください。");
        //     return false;
        // }

    }

    componentWillUpdate(props) {
    }

    ClickRental(e) {

        e.preventDefault();

        let target = e.currentTarget,
            id = target.id,
            user = target.dataset.user;

        this.history.push("/rental/"+id)

    }

    Success() {
        return !(!this.state.list || !this.state.user)
    }

    render() {

        this.state = this.props.state;

        let {
            match,
            match: { params:{page,deviceId},url},
            history,
            history: { location:{key} }
        } = this.props;

        if( !this.Success() ) return false;

        return (
            <div id="contents">

                <Header user={this.state.user} />

                <Link to="/signin">Sing In</Link>
                <Link to="/signup">Sing Up</Link>

                <div className="f-inner">
                    <Items state={this.state} rental={this.ClickRental.bind(this)} />
                </div>

                <TransitionGroup>
                    <CSSTransition
                        key={key}
                        timeout={300}
                        classNames="rental">
                        <ShowRental state={this.state} match={match} history={history} />
                    </CSSTransition>
                </TransitionGroup>

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
