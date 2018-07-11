import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'

import Root from './_root'

//scss
import '../scss/style.scss'

/*
** Firebase Initialize
*/
const config = {
  apiKey: "AIzaSyDHqPAR21LP_y8MTQttOUl2rZR_EP0atcQ",
  authDomain: "chat-3f1a7.firebaseapp.com",
  databaseURL: "https://chat-3f1a7.firebaseio.com",
  projectId: "chat-3f1a7",
  storageBucket: "chat-3f1a7.appspot.com",
  messagingSenderId: "1092855635066"
};
firebase.initializeApp(config);


/*
** Create Store
*/
const initialState = {
    login: null,
    list: null
};
let store = createStore(reducer,initialState);

/*
** Check Network
*/
const CheckNetwork = () => {
    let tagHtml = document.getElementsByTagName('html')[0];
    if( !navigator.onLine ) {
        tagHtml.classList.add("offline");
    } else {
        tagHtml.classList.remove("offline");
    }
}

/*
** Onload
*/
window.onload = () => {

    /* Firebase Initialize */
    window.auth = firebase.auth();
    window.database = firebase.database();

    // window.usersRef = window.database.ref('users');
    // window.messagesRef = window.database.ref('device');
    /* Firebase Initialize */

    window.CheckNetwork = CheckNetwork;

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
