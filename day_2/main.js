window.onload = () => {
	fetch("input.txt")
		.then(result => result.text())
		.then(text => {
			let cnv = document.createElement("canvas")
			document.body.appendChild(cnv)
			cnv.width = 1500
			cnv.height = 1500
			ct = cnv.getContext("2d")
			ct.font = "20px Arial black"

			console.log(text)

			const ranges = text
				.split(",")
				// .map(str => str.split(" "))
				.map(range => range.split("-"))
				.map(([start, end]) => ({ start: parseInt(start), end: parseInt(end) }))

			console.log(ranges)

			let counterP0 = 0
			ranges.forEach(({ start, end }) => {
				let current = start
				while (current <= end) {
					if (isNoMirrored(current)) {
						counterP0 += current
					}
					current++
				}
			})
			console.log(counterP0)

			let counterP1 = 0
			ranges.forEach(({ start, end }) => {
				let current = start
				while (current <= end) {
					if (hasNumRepeatingPattern(current)) {
						counterP1 += current
					}
					current++
				}
			})
			console.log(counterP1)

			// console.log(isOnlyPattern("12312", "12"))
			// console.log(isOnlyPattern("1212", "12"))
			// console.log(isOnlyPattern("1212121212", "12"))
			// console.log(isOnlyPattern("12431243", "1243"))
			// console.log(isOnlyPattern("124312432", "1243"))
			// console.log(hasNoRepeatingPattern("1212"))
			// console.log(hasNoRepeatingPattern("121111"))
			console.log(hasNumRepeatingPattern("11"))
			console.log(hasNumRepeatingPattern("1111"))
			console.log(hasNumRepeatingPattern("111"))
			console.log(hasNumRepeatingPattern("1212"))
		})
}

function isNoMirrored(n0) {
	let str = String(n0)
	if (str.length % 2 !== 0) {
		return false
	}
	let firstHlf = str.slice(0, str.length / 2)
	const secondHlf = str.slice(str.length / 2)
	return firstHlf == secondHlf
}
function hasNumRepeatingPattern(num) {
	let str = String(num)
	let currentPattern = str[0]

	for (let i = 1; i < str.length; i++) {
		if (isOnlyPattern(str.slice(currentPattern.length), currentPattern)) {
			return true
		}
		currentPattern += str[i]
	}
	return false
}
function isOnlyPattern(numString, pattern) {
	for (let i = 0; i < numString.length; i += pattern.length) {
		// console.log(
		// 	i,
		// 	pattern.length,
		// 	numString,
		// 	numString.slice(i, pattern.length),
		// )
		if (numString.length - i < pattern.length) {
			return false
		}
		if (numString.slice(i, i + pattern.length) !== pattern) {
			return false
		}
	}

	return pattern.length > 0
}
function isInBounds(p, grid) {
	return p.x >= 0 && p.x < grid[0].length && p.y >= 0 && p.y < grid.length
}

function getTile(v, grid) {
	return grid[v.y][v.x]
}
function hash(p) {
	return p.x + "," + p.y
}
