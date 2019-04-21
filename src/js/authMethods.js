import axiosInstance from "./axiosInstance"

export class auth {
    static async login({userName, password}) {
        try {
            const body = `username=${userName}&password=${password}&grant_type=password`

            const conf = {
                headers: {
                    contentType: "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa("client-id:secret")
                }
            }

            const { data } = await axiosInstance.post('/oauth/token', body, conf)

            return data
        } catch(e) {
            throw e
        }
    }

    static async getUserInfo() {
        try {
            console.log('send userget request:')
            const { data } = await axiosInstance.get(`/api/user/getByName`);
            console.log('recieve userget request:')
            return data;
        } catch (e) {
            throw e
        }
    }
    
    static async signUp(vals) {
        try {
            const { data } = await axiosInstance.post('/api/registerUser', vals)
            console.log(data)
            return data
        } catch (e) {
            throw e.response
        }
    }
}
