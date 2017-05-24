class Bot {
    botMessages = {
        defaultResponse: 'Да, да, я вас слушаю',
        angryResponse: 'Пожалуйста, не сердитесь.',
        questionResponse: [
            'Простите, я затрудняюсь ответить',
            'Сложный вопрос, здесь нужно подумать...',
            'Не скажу, пусть это будет маленький секрет :)'
        ]
    };

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
}

export default Bot;