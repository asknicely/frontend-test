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
        const response = await Fetch(`/login`, {
            method: 'POST',
            body,
            headers: {'Content-Type': 'application/json'},
        });
        const json = await response.json();
        if (json.success) {
            return json.user;
        }
        throw new Error(json.reason);
    }

    async getTodos()
    {
        try {
            const response = await Fetch(`${this.api_base}/todo`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const json = await response.json();
            if (json.success) {
                return json.todos;
            }
        } catch (e) {
        }

        return [];
    }

    async setTodoStatus(id, completed)
    {
        try {
            const body = JSON.stringify({
                completed
            });
            const response = await Fetch(`${this.api_base}/todo/complete/${id}`, {
                body,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            const json = await response.json();
            if (json.success) {
                return true;
            }
        } catch (e) {
        }

        return false;
    }

    async removeTodo(id)
    {
        try {
            const response = await Fetch(`${this.api_base}/todo/delete/${id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            const json = await response.json();
            if (json.success) {
                return true;
            }
        } catch (e) {
        }

        return false;
    }

    async addTodo(description)
    {
        try {
            const body = JSON.stringify({
                description
            });
            const response = await Fetch(`${this.api_base}/todo/add`, {
                body,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            const json = await response.json();
            if (json.success) {
                return json.todo;
            }
        } catch (e) {
        }

        return false;
    }
}

export default Api;