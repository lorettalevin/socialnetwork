import React from 'react';
import Registration from './registration';
import Login from "./login";

export default class Bothauth extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="bothauth-section">
                <div id="registration-section">
                    <p className="bothauth">REGISTER HERE</p>
                    <Registration />
                </div>
                <div id="login-section">
                    <p className="bothauth">LOG IN HERE</p>
                    <Login />
                </div>
            </div>
        )
    }
}
