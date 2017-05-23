import React, { Component } from 'react';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.enterSubmit = this.enterSubmit.bind(this);

        this.state = {
            message: '',
            messages: [
                {
                    id: 0,
                    text: 'Hello',
                    className: 'message-own'
                },
                {
                    id: 1,
                    text: 'Where have you been before we met',
                    className: 'message-own'
                }
            ]
        }
    }

    botMessages = {
        defaultResponse: 'Да, да, я вас слушаю'
    };

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    submitMessage() {
        if (this.state.message && this.state.message.length && ~this.state.message.search(/\S/)) {
            const nextMessage = {
                id: this.state.messages.length,
                text: this.state.message,
                className: 'message-own'
            };
            let list = Object.assign([], this.state.messages);
            list.push(nextMessage);

            let messageWithoutDots = this.state.message.replace(/\./g,'');
            if (messageWithoutDots.search(/\S/) === -1) {
                const botMessage = {
                    id: this.state.messages.length + 1,
                    text: this.botMessages.defaultResponse,
                    className: 'message-bot'
                };
                list.push(botMessage);
            }

            this.setState({
                messages: list
            });

            this.setState({
                message: ''
            });
        }
    }

    enterSubmit(event) {
        if (event.key === 'Enter') {
            this.submitMessage();
        }
    }

    render() {
        const currentMessages = this.state.messages.map((message) => {
            return (
                <p className={`message ${message.className}`} key={message.id}>{ message.text }</p>
            )
        });

        return (
            <div>
                <div className="chat-field">
                    { currentMessages }
                </div>
                <div className="type-field">
                    <input type="text" className="type-input" value={this.state.message} onKeyPress={this.enterSubmit} onChange={this.updateMessage}/>
                    <button className="type-submit" onClick={this.submitMessage}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Chat;