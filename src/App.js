//CLIENT SIDE

import React from 'react';
import axios from './axios';
import profilepic from './profilepic'
import profileupload from './profileupload'
import Logo from './logo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: '',
            showUploader: false
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    toggleUploader() {
       this.setState({ showUploader: !this.state.showUploader })
    }
    componentDidMount() {
        axios.get('/user').then(resp => {
            const { id, first, last, email, url } = resp.data.data;
                this.setState(
                    { id: id, first: first, last: last, email: email, url: url }
                )}, () => {
                    console.log("new state", this.state);
                });
        }
    render() {
        const { first, last, url, email} = this.state
        return (
            <div>
                <Logo />
                <p>Welcome { this.state.first } at { this.state.email }</p>
                <Profilepic
                    first = {first}
                    last = {last}
                    url = {url}
                    />
            </div>
        )
    }
}

//     renderSingers() {
/*toggleUploader = {this.toggleUploader}*/
/*{ this.state.showUploader && <Profileupload /> }*/
//         if (this.state.singers.length === 0) {
//             return (<div>Loading singers....</div>)
//
//         }
//
//         return this.state.singers.map(singer => {
//             const {name, band} = singer
//             return (<Singer key={singer.name} name={name} band={band}/>)
//         })
//     }
//
//     render() {
//         return (<div>
//             <h1>My Singerz</h1>
//
//             {this.renderSingers()}
//         </div>)
//     }
// }
//
// }
//
//
//
// {
//    e.preventDefault()
//    let formData = new FromData();
//    formData.append('profilepic', this.state.profilepic);
//
//    this.props.dispatch(uploadImage(formData))
// }
//
// handleChange(e) {
//    this.setState({
//        [e.target.name]: e.target.files[0]
//    }, () => {
//        console.log('new state ', this.state);
//    })
// }
//
