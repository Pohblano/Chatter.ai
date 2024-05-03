import api from './Api'

export const chat_api = {
    send_message_chatGPT: async function (entry: Object) {
        const response = await fetch(process.env.REACT_APP_IS_PRODUCTION === "yes" ? "http://chatterai.pythonanywhere.com/api" : "http://127.0.0.1:5000/api/chatGPT", {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response
    },
    send_message_ollama: async function (entry: Object) {
        const response = await fetch('http://127.0.0.1:5000/api/ollama', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response
    },
    get_conversational_data: async function (data) {
        const response = await api.request({
            url: '/get_conversational_data',
            method: 'POST',
            data,
        })
        return response
    },
    create_conversation: async function(data) {
        const response = await api.request({
            url: '/create_conversation',
            method: 'POST',
            data
        })
        return response
    },
    get_conversation: async function(data) {
        const response = await api.request({
            url: '/get_conversation',
            method: 'POST',
            data
        })
        return response
    },
    delete_conversation: async function(data) {
        const response = await api.request({
            url: '/delete_conversation',
            method: 'POST',
            data
        })
        return response
    }
}
