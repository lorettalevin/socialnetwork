import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './home';
import Bothauth from "./bothauth";
import Logo from './logo';

export default function Welcome(props) {
    return (
        <div id="welcome">
            <HashRouter>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/bothauth" component={Bothauth} />
                    </div>
            </HashRouter>
        </div>
    );
}
