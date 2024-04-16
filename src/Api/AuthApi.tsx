// Api base
import api from './Api'

export const auth_api = {
    register: async function (phoneNumber, cancel = false) {
        const response = await api.request({
            url: `/send_login_code`,
            method: "POST",
            data: phoneNumber,
        })
        return response.data
    },
}