import api from './Api'

export const chat_api = {
    send_message: async function (entry: Object) {
        const response = await fetch('http://127.0.0.1:5000/api/chatGPT', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response
    },
    get_conversations: async function (data) {
        const response = await api.request({
            url: '/get_conversations',
            method: 'POST',
            data,
        })
        
        return response
    },
}