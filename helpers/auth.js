import { CSR } from "./utilities";

const authenticate = (token, user) => {
	if (CSR) {
		sessionStorage.setItem("token", token);
		sessionStorage.setItem("user", JSON.stringify(user));
	}
};

const getToken = () => {
	if (CSR) return sessionStorage.getItem("token");
};

const getUser = () => {
	if (CSR) {
		let str = sessionStorage.getItem("user");
		return JSON.parse(str);
	}
};

const logOut = () => {
	if (CSR) {
		sessionStorage.removeItem("token");
		removeRole();
	}
};

const isAuthenticated = () => {
	if (CSR) {
		const token = sessionStorage.getItem("token");
		return token ? true : false;
	}
};

const setRole = (role) => {
	if (CSR) sessionStorage.setItem("role", role);
};

const removeRole = () => {
	if (CSR) sessionStorage.removeItem("role");
};

const getRole = () => {
	if (CSR) return sessionStorage.getItem("role");
};

export {
	authenticate,
	isAuthenticated,
	getToken,
	logOut,
	setRole,
	getRole,
	removeRole,
	getUser,
};
