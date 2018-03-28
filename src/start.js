import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from "./app";
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initSocket } from './socket'

let router;

if (location.pathname == '/welcome') {
    router = <Welcome />
} else {
    router = <App />
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

initSocket(store)

const elem = (
    <Provider store={store}>
        { router }
    </Provider>
);

ReactDOM.render(elem, document.querySelector('main'));
