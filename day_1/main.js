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

			const instructions = text
				.split("\r\n")
				.map(spl => ({ d: spl[0], amt: parseInt(spl.slice(1)) }))

			let curVal = 50
			let counter = 0
			let counterP2 = 0
			instructions.forEach(({ d, amt }) => {
				while (Math.abs(amt) > 100) {
					counterP2++
					amt -= 100 * Math.sign(amt)
				}
				if (d == "R") {
					curVal += amt
					if (curVal > 99) {
						curVal -= 100
						counterP2++
					}
				} else {
					let prevVal = curVal
					curVal -= amt
					if (curVal < 0) {
						curVal += 100
						if (prevVal != 0) {
							counterP2++
						}
					}
					if (curVal == 0) {
						counter++
						counterP2++
					}
				}
			})

			console.log("P1", counter)
			console.log("P2", counterP2)
		})
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
