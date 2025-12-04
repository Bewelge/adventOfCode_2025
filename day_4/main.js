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

			const grid = text.split("\r\n").map(line => line.split(""))
			console.log(grid)
			let countP1 = 0
			grid.forEach((row, i) =>
				row.forEach((cell, j) => {
					if (cell === "@") {
						if (
							getNeighbors(j, i, grid[0].length - 1, grid.length - 1).filter(
								ns => grid[ns.y][ns.x] === "@",
							).length < 4
						) {
							countP1++
						}
					}
				}),
			)

			let mutableGrid = grid.map(row => row.slice())
			let countP2 = 0

			while (true) {
				await delay(125)
				const removedCount = removeThingysFromGrid(mutableGrid)
				countP2 += removedCount
				if (removedCount == 0) break

				ct.clearRect(0, 0, 1500, 1500)

				mutableGrid.forEach((row, i) =>
					row.forEach((col, j) => {
						if (col == "@") {
							ct.fillRect(j * 10, i * 10, 10, 10)
						}
					}),
				)
			}

			console.log("P1", countP1)
			console.log("P2", countP2)
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
