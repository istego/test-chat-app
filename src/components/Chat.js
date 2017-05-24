import React, { Component } from 'react';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.enterSubmit = this.enterSubmit.bind(this);
        this.addBotMessage = this.addBotMessage.bind(this);

        this.state = {
            message: '',
            messages: [
                {
                    id: 0,
                    text: 'Hello!',
                    className: 'message-bot'
                }
            ]
        }
    }

    botMessages = {
        defaultResponse: 'Да, да, я вас слушаю',
        angryResponse: 'Пожалуйста, не сердитесь.',
        questionResponse: [
            'Простите, я затрудняюсь ответить',
            'Сложный вопрос, здесь нужно подумать...',
            'Не скажу, пусть это будет маленький секрет :)'
        ]
    };

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    submitMessage() {
        if (this.state.message.length && ~this.state.message.search(/\S/)) {
            const nextMessage = {
                id: this.state.messages.length,
                text: this.state.message,
                className: 'message-own'
            };
            let list = Object.assign([], this.state.messages);
            list.push(nextMessage);

            let messageCopy = this.state.message.slice(0);

            this.setState({
                messages: list,
                message: ''
            });

            let objDiv = document.querySelector('.chat-field');
            objDiv.scrollTop = objDiv.scrollHeight;

            if (isNoContent(messageCopy)) {
                this.addBotMessage(list, this.botMessages.defaultResponse, objDiv);
            } else if (isShout(messageCopy)) {
                this.addBotMessage(list, this.botMessages.angryResponse, objDiv);
            } else if (isQuestion(messageCopy)) {
                let randomAnswer = randomInteger(this.botMessages.questionResponse.length);
                this.addBotMessage(list, this.botMessages.questionResponse[randomAnswer], objDiv);

                function randomInteger(max) {
                    let rand = Math.random() * max;
                    rand = Math.floor(rand);
                    return rand;
                }
            }

            function isNoContent(message) {
                let messageWithoutDots = message.replace(/\./g,'');
                return messageWithoutDots.search(/\S/) === -1;
            }

            function isShout(message) {
                return message.match(/[A-ZА-ЯЁ]{4,}/g) || (message.match(/[^\d\wа-яё]{2,}/gi) && !message.match(/[\d\wа-яё]/gi))
            }

            function isQuestion(message) {
                return message.substr(-1) === '?';
            }
        }
    }

    addBotMessage(list, message, div) {
        setTimeout(() => {
            const botMessage = {
                id: list.length,
                text: message,
                className: 'message-bot'
            };
            list.push(botMessage);
            this.setState({
                messages: list,
            });
            div.scrollTop = div.scrollHeight;
        }, 150);
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