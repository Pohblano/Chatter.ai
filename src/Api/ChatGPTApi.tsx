import api from './Api'

export const ChatApi = {
    chat: async function (entry, cancel = false) {
        const response = await api.request({
            url: `/chatGPT`,
            method: "POST",
            data: entry,
            responseType: 'stream',
        })
        return response
    }
}