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

			const instructions = text
				.split("\r\n")
				// .map(str => str.split(" "))

				.map(spl => ({ d: spl[0], amt: parseInt(spl.slice(1)) }))

			console.log(instructions)
			const modifier = { L: -1, R: 1 }
			let dial = 50
			let passwordV1 = 0
			let passwordV2 = 0
			const mod = (input, mod) => ((input % mod) + mod) % mod
			instructions.forEach(ins => {
				const { d: direction, amt: turnsData } = ins
				// Calculate the full rotations already made and how much we have left to rotate afterwards
				const turns = turnsData
				const rotations = Math.floor(turns / 100)
				const remainder = turns - rotations * 100

				const updatedDial = dial + modifier[direction] * remainder

				// If we arrive at exactly 0 we increment the password
				if (mod(updatedDial, 100) === 0) {
					passwordV1 += 1
				}

				// Add all full rotations and calculate if we rotate still with the remainder
				passwordV2 += rotations
				if ((dial !== 0 && updatedDial <= 0) || updatedDial > 99) {
					passwordV2 += 1
				}

				// Update dial to new position
				dial = mod(updatedDial, 100)
			})
			console.log(passwordV1, passwordV2)

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
