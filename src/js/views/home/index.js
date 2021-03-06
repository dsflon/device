import React from 'react';
import { Link, Route } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import { Helmet } from "react-helmet";
import Sign from '../../common/_sign';
import Fetch from '../../common/_fetch';
import Header from './_header';
import Items from './_items';
import ShowRental from './_rental';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.stuser = localStorage.getItem(window.LSUser);
        this.stuser = JSON.parse(this.stuser);
    }

    componentWillMount() {

        this.history = this.props.history;
        window.actions = this.props.actions;

        if(this.stuser && Object.values(this.stuser)[0] ) {
            // 既サインイン時
            window.actions.User( this.stuser );
            window.userRef.update( this.stuser ); // DBからアカウントが削除されていたときの保険
            Fetch();
        } else if( this.stuser && !Object.values(this.stuser)[0] ) {
            // サインアウト時
            location.replace('/signin');
        } else {
            // アカウント無し時
            location.replace('/signup');
        }

    }

    componentDidMount() {
        window.Loading.Hide();
    }
    componentWillUpdate() {
        window.NetworkMessage();
    }

    Remove(e) {
        e.preventDefault();
        Sign.Remove(() => {
            // location.replace('/signup');
            this.history.replace('/signup')
        });
    }

    SignOut(e) {
        e.preventDefault();
        Sign.Out( Object.keys(this.state.user)[0], () => {
            // location.replace('/signin');
            this.history.replace('/signin')
        } );
    }

    OpenMenu(e) {
        let target = this.refs.header_nav,
            target2 = this.refs.list_area;
        if( target.classList.contains("nav_show") ) {
            target.classList.remove("nav_show")
            target2.classList.remove("nav_show")
        } else {
            target.classList.add("nav_show")
            target2.classList.add("nav_show")
        }
    }
    CloseMenu(e) {
        let target = this.refs.header_nav,
            target2 = this.refs.list_area;
        target.classList.remove("nav_show")
        target2.classList.remove("nav_show")
    }

    ClickRental(e) {

        e.preventDefault();

        let target = e.currentTarget,
            id = target.id,
            deviceName = target.dataset.devicename,
            user = target.dataset.user;

        if(user !== "other") {
            // this.history.push("/rental/"+id);
            this.history.replace("/rental/"+id)
        } else {
            window.BodyMessage.AutoPlay(deviceName+" は貸出中です");
        }

    }

    Success() {
        return !(!this.state.list || !this.state.user)
    }

    render() {

        this.state = this.props.state;

        let {
            match,
            history,
        } = this.props;

        if( !this.Success() ) return false;

        this.user = Object.values(this.state.user)[0];

        return (
            <div id="home" className="contents">

                <Helmet title="Device Rental System"></Helmet>

                <Header OpenMenu={this.OpenMenu.bind(this)} />

                <div className="header_nav f-inner">
                    <nav className="header_nav_inner" ref="header_nav">
                        <Link to="/edit_profile" className="header_user">
                            <p>{this.user.dep + ": " + this.user.name}</p>
                            <span> さん</span>
                        </Link>
                        <ul>
                            <li><button onClick={this.SignOut.bind(this)}>Sign Out</button></li>
                            <li><button onClick={this.Remove.bind(this)}>Remove Account</button></li>
                        </ul>
                    </nav>
                </div>

                <div className="f-inner lists_wrap" ref="list_area" onClick={this.CloseMenu.bind(this)}>
                    <Items state={this.state} rental={this.ClickRental.bind(this)} />
                </div>

                <ShowRental
                    state={this.state}
                    match={match}
                    history={history} />

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
