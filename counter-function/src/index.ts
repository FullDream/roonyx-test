interface CountersState {
	states: number[]
	cursor: number
}

const countersState: CountersState = {
	states: [],
	cursor: 0,
}

const counter = (number: number = 0): (() => void | number)[] => {
	countersState.states.push(number)
	const currentCursor = countersState.cursor

	const current = () => countersState.states[currentCursor]
	const up = () => {
		countersState.states[currentCursor] += 1
	}

	countersState.cursor += 1
	return [current, up]
}

const [current1, up1] = counter(2)
const [current2, up2] = counter(0)

up1()
up1()

up2()
up2()

up1()

console.log('counter one', current1())
console.log('counter two', current2())
