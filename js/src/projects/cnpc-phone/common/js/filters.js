export function phoneFormat(val) {
	return val.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}