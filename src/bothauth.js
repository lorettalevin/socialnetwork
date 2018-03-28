import React from 'react';
import Registration from './registration';
import Login from "./login";

export default class Bothauth extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <div id="content-container">
                    <p id="network-content">Are you new around here? Did you get sick of paying $3500 for a shoebox in New York City? Did you trade the hipster cafes of Williamsburg for those in trendy Kreuzberg? Join our online community of expats from New York who have recently moved to Berlin!</p>
                </div>
                <div id="bothauth-wrapper">
                    <div className="bothauth-section">
                        <p className="bothauth-text">sign up</p>
                        <Registration />
                    </div>
                    <div className="bothauth-section">
                        <p className="bothauth-text">sign in</p>
                        <Login />
                    </div>
                </div>
            </div>
        )
    }
}
