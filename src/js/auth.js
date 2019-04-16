import axiosInstance from "./axiosInstance"

export class auth {
    static async login(username, password) {
        try {
            const body = `username=${username}&password=${password}&grant_type=password`

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
        } catch (error) {
            throw error;
        }
    }
}
