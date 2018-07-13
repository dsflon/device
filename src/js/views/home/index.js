import React from 'react';
import { Link, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Fetch from '../../common/_fetch';
import Header from './_header';
import Items from './_items';
import Borrow from './_borrow';
import Return from './_return';

const ShowRental = (props) => {

    let {state,history,match} = props;

    // let deviceId = match.params.deviceId;
    let deviceId = history.location.pathname.split(match.url+"/")[1];
    console.log(deviceId);

    if(!deviceId) return <div />;

    let keys = deviceId.split("_");
    let item = state.list[keys[0]][keys[1]];
    let rental = item.user ? item.user.uid : "borrow";

    switch (rental) {

        case 'borrow':
        return <Borrow deviceId={deviceId} item={item} history={history} user={state.user} />

        case Object.keys(state.user)[0]:
        return <Return deviceId={deviceId} item={item} history={history} />;

    }

}

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
        this.history = this.props.props.history;
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

    componentWillUpdate() {
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
            props: {
                match,
                history,
                match: { params:{page},url },
                location: { key }
            }
        } = this.props;


        if( !this.Success() ) return false;

        let rentalModal = page ? <ShowRental state={this.state} match={match} history={history} /> : <div />;

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
                        key={page ? page : "home"}
                        timeout={3000}
                        classNames="rental">
                        <ShowRental state={this.state} match={match} history={history} />
                    </CSSTransition>
                </TransitionGroup>

                {/*<TransitionGroup>
                    <CSSTransition
                        key={page ? page : "home"}
                        timeout={3000}
                        classNames="rental">
                        <Route
                            path={`${url}/:deviceId?`}
                            render={({match,history}) => (
                                <ShowRental state={this.state} match={match} history={history} />
                            )} />
                    </CSSTransition>
                </TransitionGroup>*/}

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
