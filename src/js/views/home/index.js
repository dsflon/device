import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Fetch from '../../common/_fetch';
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

    }

    ClickRental(e) {

        e.preventDefault();

        let target = e.currentTarget,
            id = target.id,
            user = target.dataset.user,
            rentalDic = {
                'own': () => {
                    this.history.push("/return?deviceid="+id);
                },
                'other': () => { console.log("借りれません") },
                'no': () => {
                    this.history.push("/borrow?deviceid="+id);
                }
            }

        rentalDic[user]();

    }

    ShowRental(){

        let rental = this.props.match.params.rental,
            deviceId = this.props.location.search;

        if(!rental || !deviceId) return false;

            deviceId = deviceId.split("?deviceid=")[1];

        let keys = deviceId.split("_"),
            item = this.state.list[keys[0]][keys[1]];

        switch (rental) {

            case 'borrow':
            return <Borrow key="borrow" deviceId={deviceId} item={item} history={this.history} user={this.state.user} />

            case 'return':
            return <Return key="return" deviceId={deviceId} item={item} history={this.history} />;

        }

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

        let item = this.Success() ? <Items state={this.state} rental={this.ClickRental.bind(this)} /> : null;
        let rental = this.Success() ? this.ShowRental() : null;

        return (
            <div id="contents" className="f-inner">
                {item}
                {rental}
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
