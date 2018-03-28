import React from 'react';
import axios from './axios';

export default class ProfilePicUpload extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData()
        formData.append('file', this.state.profilepic);
        axios.post('/profilepicupload', formData).then(results => {
            document.querySelector('input[type="file"]').value = '';
            this.props.setImage(results.data.url);
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        }, () => console.log("new state", this.state)
    )}

    render() {
        return (<div className="profile-pic-uploader">
            <form>
                <input onChange={this.handleChange} name="profilepic" type="file"/>
                <button className="submit-button" onClick={this.handleSubmit}>SUBMIT</button>
            </form>
        </div>)
    }
}
