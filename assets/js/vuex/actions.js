import * as types from "./types";
import { setCookie, deleteCookie } from "../utils/cookies.utils";

export default {
	setAuth ({ commit }, auth) {
		commit(types.SET_AUTH, auth);
		setCookie('todo_user', auth);
	},

	removeAuth ({ commit }) {
		commit(types.SET_AUTH, null);
		deleteCookie('todo_user');
	},

	setToken ({ commit }, token) {
		commit(types.SET_TOKEN, token);
		setCookie('authT', token);
	},

	removeToken ({ commit }) {
		commit(types.SET_TOKEN, null);
		deleteCookie('authT');
	}
}
