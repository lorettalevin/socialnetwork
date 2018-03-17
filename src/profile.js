import React from 'react';
import axios from './axios';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 onClick={this.props.toggleBio}>
                    {this.props.bio}
                </h1>
            </div>
        )
    }
}
