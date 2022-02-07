export function setCookie (key, value, days) {
	let cookiesValue = JSON.stringify(value);
	let date = new Date();

	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	document.cookie = `${key}=${cookiesValue}; expires=${+ date.toGMTString()}`;
}

export function getCookie (key) {
	let allCookies = document.cookie.split(';');
	let cookieKey = `${key}=`;

	let result = allCookies.filter(c => c.includes(cookieKey));

	if (!result.length) return null;

	let cookieString = result[0].trim();
	return JSON.parse(cookieString.substring(cookieKey.length, cookieString.length));
}

export function deleteCookie (key) {
	document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
