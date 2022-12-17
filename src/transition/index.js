export function resizeWidth(node, {
	delay = 0,
	duration = 400
}) {
    const style = getComputedStyle(node)
	const width = parseFloat(style.width);


	return {
		delay,
		duration,
		css: t => `width: ${t * width}`
	};
}

export function resizeHeight(node, {
	delay = 0,
	duration = 400
}) {
    const style = getComputedStyle(node)
	const height = parseFloat(style.height);


	return {
		delay,
		duration,
		css: t => `height: ${t * height}`
	};
}