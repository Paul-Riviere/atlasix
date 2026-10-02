export function assertType(
	value: unknown,
	type: string,
	field: string,
	className: string,
) {
	if (typeof value !== type) {
		throw new Error(`${className} ${field} must be ${type}.`);
	}
}
