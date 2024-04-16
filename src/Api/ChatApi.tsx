import api from './Api'

export const chat_api = {
    c: async function (entry, cancel = false) {
        const response = await api.request({
            url: `/chatGPT`,
            method: "POST",
            data: entry,
            responseType: 'stream',
        })
        return response.data
    },
    chat: async function (entry: Object) {
        const response = await fetch('http://127.0.0.1:5000/api/chatGPT', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response
    }
}