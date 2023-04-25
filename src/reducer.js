export function reducer1(
	state = {
		isLoggedIn: localStorage.token ? true : false,
	},
	action
) {
	switch (action.type) {
		case "LOGIN": {
			state = { ...state };
			state.isLoggedIn = true;
			return state;
		}
		case "LOGOUT": {
			state = { ...state };
			state.isLoggedIn = false;
			return state;
		}
		default:
			return state;
	}
}
