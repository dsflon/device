import firebase from 'firebase/app';
import 'firebase/database';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';
import FireInit from './fireinit';

import BodyMessage from './common/_bodyMessage';
import Network from './common/_checkNetwork';

//scss
import '../scss/style.scss'

/*
** Create Store
*/
const initialState = {
    user: null,
    list: null
};
let store = createStore(reducer,initialState);

/*
** Window Object
*/
window.LSUser = "deviceRentalSystem";
window.LSData = "deviceRentalSystemData";
window.Network = new Network();

window.BodyMessage = new BodyMessage(document.getElementById('app'));
window.Loading = {
    Show: () => { document.body.classList.add("loading") },
    Hide: () => { document.body.classList.remove("loading") }
};
window.NetworkMessage = () => {
    if(window.Network.Check()) {
        window.BodyMessage.Remove();
    } else {
        window.BodyMessage.Set("ネットワークをご確認ください!");
    }
}


/*
** Onload
*/
window.onload = () => {

    /* Firebase Initialize */
    window.database = firebase.database();

    window.userRef = window.database.ref('users');
    window.devideRef = window.database.ref('devices');
    /* Firebase Initialize */

    /*
    ** React
    */
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById('app')
    );

};


/*
** Service Worker
*/
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker
    .register('./sw.js')
    .then(function() {
        console.log('Service Worker Registered');
    });
}
