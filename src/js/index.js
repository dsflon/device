import firebase from 'firebase/app';
import 'firebase/database';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root';

import BodyMessage from './common/_bodyMessage';
import CheckNetwork from './common/_checkNetwork';

//scss
import '../scss/style.scss'

/*
** Firebase Initialize
*/
const config = {
    apiKey: "AIzaSyAoCKwZTDg2cnk4EL__2F551peIH409Mug",
    authDomain: "device-rental.firebaseapp.com",
    databaseURL: "https://device-rental.firebaseio.com",
    projectId: "device-rental",
    storageBucket: "",
    messagingSenderId: "911109915400"
};
firebase.initializeApp(config);


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
window.CheckNetwork = new CheckNetwork();
window.BodyMessage = new BodyMessage(document.getElementById('app'));
window.Loading = {
    Show: () => { document.body.classList.add("loading") },
    Hide: () => { document.body.classList.remove("loading") }
};


/*
** Onload
*/
window.onload = () => {

    /* Firebase Initialize */
    window.database = firebase.database();

    window.userRef = window.database.ref('users');
    window.messagesRef = window.database.ref('device');
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
// if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
//     navigator.serviceWorker
//     .register('./sw.js')
//     .then(function() {
//         console.log('Service Worker Registered');
//     });
// }
