document.addEventListener('DOMContentLoaded', function() {
    const profiles = document.querySelectorAll('.profile');
    const chatBoxes = document.querySelectorAll('.chat-box');

    profiles.forEach((profile, index) => {
        profile.addEventListener('click', function() {
            openChat(index);
        });
    });

    function openChat(index) {
        // Close all open chat boxes
        chatBoxes.forEach(chatBox => {
            chatBox.style.display = 'none';
        });

        // Open chat box for the selected person
        chatBoxes[index].style.display = 'block';
    }

    // Send message functionality
    const sendButtons = document.querySelectorAll('.send-button');
    const messageInputs = document.querySelectorAll('.message-input');

    sendButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            sendMessage(index);
        });
    });

    messageInputs.forEach((input, index) => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage(index);
            }
        });
    });

    function sendMessage(index) {
        const chatBox = chatBoxes[index];
        const messageInput = chatBox.querySelector('.message-input');
        const message = messageInput.value.trim();

        if (message !== '') {
            const messagesContainer = chatBox.querySelector('.messages');
            sendMessageElement(messagesContainer, message, 'sent');
            messageInput.value = ''; // Clear input after sending message
        }
    }

    function sendMessageElement(messagesContainer, message, messageType) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', messageType === 'sent' ? 'sent-message' : 'received-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        messageTime.textContent = `${hours}:${minutes}`;

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);

        messagesContainer.appendChild(messageDiv);
    }
});
