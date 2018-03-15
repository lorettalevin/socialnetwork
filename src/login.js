import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/login', this.state).then((resp) => {
            if (resp.data.success) {
                location.replace('/login');
            } else {
                this.setState({
                    error: true,
                    errorMessage: resp.data.errorMessage
                }, () => {
                    console.log(this.state)
                })
            }
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {email, password} = this.state
        return (<div>
            {this.state.error && <div>{this.state.errorMessage}</div>}
            <form>
                <input onChange={this.handleChange} name="email" type="text" placeholder="Email"/>
                <input onChange={this.handleChange} name="password" type="password" placeholder="Password"/>
                <button onClick={this.handleSubmit}>SUBMIT</button>
            </form>
            <Link to="/">Not registered yet? Register here!</Link>
        </div>)
    }
}
