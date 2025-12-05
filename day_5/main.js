window.onload = () => {
	fetch("input.txt")
		.then(result => result.text())
		.then(async text => {
			let cnv = document.createElement("canvas")
			document.body.appendChild(cnv)
			cnv.width = 1500
			cnv.height = 1500
			ct = cnv.getContext("2d")
			ct.font = "20px Arial black"

			console.log(text)

			let [ranges, ids] = text
				.split("\r\n\r\n")
				.map(parts => parts.split("\r\n"))
			console.log(ranges, ids)
			ids = ids.map(id => parseInt(id))
			ranges = ranges
				.map(range => range.split("-"))
				.map(spl => ({ min: parseInt(spl[0]), max: parseInt(spl[1]) }))
			console.log(ranges)

			let countP1 = 0
			ids.forEach(id => {
				if (ranges.find(range => range.min <= id && range.max >= id)) {
					countP1++
				}
			})
			console.log(countP1)

			let ranges2 = ranges.slice().map(obj => ({ ...obj }))
			ranges2.sort((a, b) => a.min - b.min)

			for (let i = 0; i < ranges2.length; i++) {
				const range0 = ranges2[i]
				while (i < ranges2.length - 1 && ranges2[i + 1].min <= range0.max) {
					range0.max = Math.max(range0.max, ranges2[i + 1].max)
					ranges2.splice(i + 1, 1)
				}
			}

			console.log(
				"p2",
				ranges2.reduce((p, c) => p + (c.max - c.min + 1), 0),
			)
		})
}
const delay = ms => new Promise(res => setTimeout(res, ms))

function removeThingysFromGrid(mutableGrid) {
	let removedCount = 0
	mutableGrid.forEach((row, i) =>
		row.forEach((cell, j) => {
			if (cell === "@") {
				if (
					getNeighbors(
						j,
						i,
						mutableGrid[0].length - 1,
						mutableGrid.length - 1,
					).filter(ns => mutableGrid[ns.y][ns.x] === "@").length < 4
				) {
					removedCount++
					mutableGrid[i][j] = "O"
					anyRemoved = true
				}
			}
		}),
	)
	return removedCount
}

function getNeighbors(x, y, dimX, dimY) {
	let ns = []
	if (x > 0) {
		ns.push({ x: x - 1, y: y })
	}
	if (y > 0) {
		ns.push({ x: x, y: y - 1 })
	}
	if (x < dimX) {
		ns.push({ x: x + 1, y: y })
	}
	if (y < dimY) {
		ns.push({ x: x, y: y + 1 })
	}
	if (x > 0 && y > 0) {
		ns.push({ x: x - 1, y: y - 1 })
	}
	if (x < dimX && y > 0) {
		ns.push({ x: x + 1, y: y - 1 })
	}
	if (x < dimX && y < dimY) {
		ns.push({ x: x + 1, y: y + 1 })
	}
	if (x > 0 && y < dimY) {
		ns.push({ x: x - 1, y: y + 1 })
	}
	return ns
}
