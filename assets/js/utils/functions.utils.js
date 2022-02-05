export function appBusy (toggle) {
	if (!toggle) return false;
	$('html').addClass('busy');
}

export function appIdle (toggle) {
	if (!toggle) return false;
	$('html').removeClass('busy');
}
