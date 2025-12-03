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

			const banks = text.split("\r\n").map(range => range.split(""))
			let sumP1 = 0
			banks.forEach(bank => {
				let highest = 9
				let chosen = []

				let minIndex = 0
				while (chosen.length < 2) {
					const end = bank.length - 1 + chosen.length

					let index = bank.slice(minIndex, end).indexOf(String(highest))

					if (index > -1) {
						chosen.push(bank[minIndex + index])
						minIndex = minIndex + index + 1
						highest = 9
					} else {
						highest--
					}
				}
				let num = parseInt(chosen.reduce((p, c) => p + c, ""))
				console.log(num, chosen)
				sumP1 += num
			})
			console.log("P1", sumP1)

			let sumP2 = 0
			banks.forEach(bank => {
				let highest = 9
				let chosen = []

				let minIndex = 0
				while (chosen.length < 12) {
					const end = bank.length - (11 - chosen.length)

					let index = bank.slice(minIndex, end).indexOf(String(highest))

					if (index > -1) {
						chosen.push(bank[minIndex + index])
						minIndex = minIndex + index + 1
						highest = 9
						// cache[hash] = chosen.slice()
					} else {
						highest--
					}
				}
				let num = parseInt(chosen.reduce((p, c) => p + c, ""))
				console.log(num, chosen)
				sumP2 += num
			})
			console.log("P2", sumP2)
		})
}
