import React from 'react';
import axios from './axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            url: 'https://cdn.dribbble.com/users/5976/screenshots/2604551/clone_find_search_social_network_logo_design_symbol_mark_icon_by_alex_tass.jpg',
            bio: 'Default Bio'
        };
    }
    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.id}`).then(resp => {
            if (resp.data.success === false) {
                return this.props.history.push('/')
            } else {
                const {id, first, last, email, url, bio} = resp.data;
                this.setState({
                    id,
                    first,
                    last,
                    email,
                    url: url || this.state.url,
                    bio: bio || this.state.bio
                })
            }
        })
    }

    render(){
        const {id, first, last, email, url, bio} = this.state
        return(
            <div>
                <p>
                    Hello {first} {last} at {email}!
                </p>
                <img src={url} alt="Profile Picture"/>
                <p>{bio}</p>
            </div>
        )
    }
}
