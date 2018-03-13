import React from 'react';
import Singer from './Singer'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            singers: []
        }
    }

    componentDidMount() {
        axios.get('/singers')
            .then(res => {
                // this.state.singers = res.data // WRONG!

                this.setState({ singers: res.data }, () => {
                    console.log("new state", this.state);
                })
            })
    }

    renderSingers() {
        if(this.state.singers.length === 0) {
            return (
                <div>Loading singers....</div>
            )

        }

        return this.state.singers.map(singer => {
            const { name, band } = singer
            return (
                <Singer
                    key={ singer.name }
                    name={ name }
                    band={ band }
                />
            )
        })
    }

    render() {
        return (
            <div>
                <h1>My Singerz</h1>

                { this.renderSingers() }
            </div>
        )
    }
}
