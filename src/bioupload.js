import React from 'react';
import axios from './axios';

export default class BioUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newBio: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.post("/bio", {bio: this.state.newBio}).then(results => {
            this.props.setBio(results.data.bio);
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form>
                    <textarea onChange={this.handleChange} name="newBio"></textarea>
                    <button onClick={this.handleSubmit}>SUBMIT</button>
                </form>
            </div>
        )
    }
}
