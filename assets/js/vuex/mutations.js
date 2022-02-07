import * as types from "./types";

export default {
	[types.SET_AUTH] (state, payload) {
		state.user = payload
	},

	[types.SET_TOKEN] (state, payload) {
		state.token = payload
	}
}
