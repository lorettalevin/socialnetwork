import React from 'react';
import { connect } from 'react-redux';
import { emitChatMessage } from './socket'

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    enterChatMessage(e) {
        if (e.keyCode == 13) {
            let message = e.target.value
            e.target.value = ''
            emitChatMessage(message)
            e.preventDefault()
            }
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
                <p className="headline">Chat Online</p>
                <div id="chat-container">
                    <form>
                        <textarea onKeyDown={this.enterChatMessage} id="chatbox" placeholder="Type a message and hit enter"></textarea>
                    </form>
                    <div id="chat-messages">{this.renderChats()}</div>
                </div>
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
