import {fetch as Fetch} from 'whatwg-fetch';

class Api {
    constructor(api_base)
    {
        this.api_base = api_base;
    }

    async logout()
    {
        try {
            await Fetch(`/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        } catch (ex) {
            console.error(ex);
        }
    }

    async authenticate(username, password)
    {
        const body = JSON.stringify({
            username,
            password
        });
        try {
            const response = await Fetch(`/login`, {
                method: 'POST',
                body,
                headers: {'Content-Type': 'application/json'},
            });
            const user = await response.json();
            if (user.success) {
                return user.user;
            }
        } catch (ex) {
            console.error(ex);
        }
    }
}

export default Api;