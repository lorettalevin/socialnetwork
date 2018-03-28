import React from 'react';
import { connect } from 'react-redux';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    renderChats() {
        if(!this.props.chats){ //matches with left side of mapStateToProps key
            return (<div>Loading...</div>)
        }
        return this.props.chats.map(chats => {
            return (
                <div key={chats.id}>
                    <p>{chats.message}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>CHATBOX</h1>
                <div>{this.renderChats()}</div>
                    <form>
                        <textarea onChange={this.handleChange} name="chatbox"></textarea>
                        <button className="submit-button" onClick={this.handleSubmit}>SUBMIT</button>
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chats: state.chats
    }
}

export default connect(mapStateToProps)(Chat)
