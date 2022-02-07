export function showToast ({ message = '', title = '' }, variant) {
	this.$root.$bvToast.toast(message, {
		title           : title,
		autoHideDelay   : 5000,
		appendToast     : true,
		variant			: variant,
		solid           : true
	});
}

export function showError (error) {
	const message = error.response.data.msg || 'Unknown error.';
	const title = `${error.response.status} ${error.response.statusText}`

	this.showToast({ message, title }, 'danger')
}

