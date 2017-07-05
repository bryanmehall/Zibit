import { getValue } from './ducks/quantity/selectors'
//put this here instead of an action because it is like a component that dispatches actions on a certain condition
export const runTests = (state) => {
	const isEqual = tests.isEqual(state, 't', 5)
}

const tests = {
	isEqual: (state, quantity, value, tolerance=0.01) => {
		const quantityValue = getValue(state, 't')
		return quantityValue > value - tolerance && quantityValue < value + tolerance
	}
}
