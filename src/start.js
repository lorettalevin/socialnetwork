import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import Registration from "./registration";
import Logo from "./logo";

let router;

if (location.pathname == '/welcome') {
    router = <Welcome />
} else {
    router = <Logo />
}

ReactDOM.render(router, document.querySelector('main'));
