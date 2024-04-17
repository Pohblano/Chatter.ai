// Api base
import api from './Api'

export const auth_api = {
    register: async function (data, cancel = false) {
        const response = await api.request({
            url: `/send_login_code`,
            method: "POST",
            data,
        })
        return response
    },
    validate: async function (data, cancel = false) {
        const response = await api.request({
            url: `/verify_login_code`,
            method: "POST",
            data,
        })
        return response
    },
}