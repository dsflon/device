import React from 'react';
import { Link, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

import Sign from '../../common/_sign';
import Fetch from '../../common/_fetch';
import Header from './_header';
import Items from './_items';
import ShowRental from './_rental';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.stuer = localStorage.getItem(window.LSName);
        this.stuer = JSON.parse(this.stuer);
    }

    componentWillMount() {

        this.history = this.props.history;
        window.actions = this.props.actions;

        if(this.stuer && Object.values(this.stuer)[0] ) {
            // 既サインイン時
            window.actions.User( this.stuer );
            Fetch();
        } else if( this.stuer && !Object.values(this.stuer)[0] ) {
            // サインアウト時
            location.replace('/signin');
        } else {
            // アカウント無し時
            location.replace('/signup');
        }

    }

    Remove(e) {
        e.preventDefault();
        window.Loading.Show();
        Sign.Remove(() => {
            location.replace('/signup');
            window.Loading.Hide();
        });
    }

    SignOut(e) {
        e.preventDefault();
        window.Loading.Show();
        Sign.Out( Object.keys(this.state.user)[0], () => {
            location.replace('/signin');
            window.Loading.Hide();
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
            this.history.push("/rental/"+id);
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
            match: { params:{page,deviceId},url},
            history,
            history: { location:{key} }
        } = this.props;

        if( !this.Success() ) return false;

        this.user = Object.values(this.state.user)[0];

        return (
            <div id="home" className="contents">

                <Header OpenMenu={this.OpenMenu.bind(this)} />

                <nav id="header_nav" ref="header_nav">
                    <Link to="/edit_profile" className="header_user">
                        <p>{this.user.dep + ": " + this.user.name}</p>
                        <span> さん</span>
                    </Link>
                    <ul>
                        <li><button onClick={this.SignOut.bind(this)}>Sign Out</button></li>
                        <li><button onClick={this.Remove.bind(this)}>Remove Account</button></li>
                    </ul>
                </nav>

                <div className="f-inner lists_wrap" ref="list_area" onClick={this.CloseMenu.bind(this)}>
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
