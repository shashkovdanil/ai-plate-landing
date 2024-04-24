export function extractJSON(str: string) {
	const regex = /{.*}/s;
	const match = str.match(regex);
	return (match ? match[0] : str).trim();
}
