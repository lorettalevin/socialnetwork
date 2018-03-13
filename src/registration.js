import React from 'react'; //import for all components
import axios from 'axios';

export default class Registration extends React.Component {
    constructor() {
        super()

        this.state = {
            first: '',
            last: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this) //"this" can lose meaning like in Vue... error might look like "canot read property state of undefined"
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post('/registration', this.state).then((resp) => {
            if (resp.data.success) {
                location.replace('/');
            }
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state)) //"state" is kinda similar to "data" in vue
    }

    render() {
        const {first, last, email, password} = this.state
        return (<form>
            <input onChange={this.handleChange} name="first" type="text" placeholder="First Name"/>
            <input onChange={this.handleChange} name="last" type="text" placeholder="Last Name"/>
            <input onChange={this.handleChange} name="email" type="text" placeholder="Email"/>
            <input onChange={this.handleChange} name="password" type="password" placeholder="Password"/>
            <button onClick={this.handleSubmit}>SUBMIT</button>
        </form>)
    }
}
