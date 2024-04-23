// Saves an item to custom property in local storage
const saveToLocalStorage = (name, data) => {
	localStorage.setItem(name, data)
}

// Retrieves item from localStorage
const getFromLocalStorage = (name) => {
	return localStorage.getItem(name)
}

// Deletes item from localStorage
const deleteFromLocalStorage = (name) => {
	localStorage.removeItem(name)
}

// Parses user Jwt token to access user object
const parseJwtToken = (token) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

export {
	parseJwtToken,
	getFromLocalStorage,
	saveToLocalStorage,
	deleteFromLocalStorage
}