import { getCookie } from "../utils/cookies.utils";

export default {
	user: getCookie('todo_user') || null,

	token: getCookie('authT') || null
}
