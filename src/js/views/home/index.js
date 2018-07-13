import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Fetch from '../../common/_fetch';
import Header from './_header';
import Items from './_items';
import Borrow from './_borrow';
import Return from './_return';

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

    componentWillUpdate() {
    }

    ClickRental(e) {

        e.preventDefault();

        let target = e.currentTarget,
            id = target.id,
            user = target.dataset.user;

        this.history.push("/rental?deviceid="+id)

    }

    ShowRental(){

        let rental = this.props.match.params.rental,
            deviceId = this.props.location.search;

        if(!rental || !deviceId) return false;

            deviceId = deviceId.split("?deviceid=")[1];

        let keys = deviceId.split("_"),
            item = this.state.list[keys[0]][keys[1]];

            rental = item.user ? item.user.uid : "borrow";

        switch (rental) {

            case 'borrow':
            return <Borrow key="borrow" deviceId={deviceId} item={item} history={this.history} user={this.state.user} />

            case Object.keys(this.state.user)[0]:
            return <Return key="return" deviceId={deviceId} item={item} history={this.history} />;

        }

    }

    Success() {
        return !(!this.state.list || !this.state.user)
    }

    render() {

        this.state = this.props.state;

        if( !this.Success() ) return false;

        let rental = this.ShowRental();

        return (
            <div id="contents" className="f-inner">

                <Header user={this.state.user} />
                <Items state={this.state} rental={this.ClickRental.bind(this)} />

                <TransitionGroup>
                    <CSSTransition
                        key={rental.key}
                        timeout={300}
                        classNames="rental">
                        <div>{rental}</div>
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
