import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Registration from './registration';
import Login from "./login";
import Logo from './logo';

export default function Welcome(props) {
    return (<div id="welcome">
        <Logo/>
        <HashRouter>
            <div>
                <Route exact path="/" component={Registration}/>
                <Route path="/login" component={Login}/>
            </div>
        </HashRouter>
    </div>);
}
