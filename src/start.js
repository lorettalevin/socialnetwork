import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from "./app";

let router;

if (location.pathname == '/welcome') {
    router = <Welcome />
} else {
    router = <App />
}

ReactDOM.render(router, document.querySelector('main'));
