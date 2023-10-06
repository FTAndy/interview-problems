/*
  description: 
  the definetion of symmetry string from this problem is that string contain reverse symbol like <<>>, <>
  give a string only contain char "<", ">", and "?", return the size of the longest symmetry substring
  
  input: 
   - include <, >, ?
   - symbol ? can replace with < or >
   
  output: 
    - the size of the longest symmetry substring

  example:
  input: "><??><"
  output: 4
  longest symmetry substring: <<>>

*/
function getLongestSymmetrySubstring(string) {
	let leftSize = 0
	let result = 0
	let symmetryStringSize = 0
	const size = string.length
	const leftDp = new Array(size).fill(0)
	const rightDp = new Array(size).fill(0)
	
	// prefix
	for (let i = 1; i < size; i++) {
			if (string[i - 1] === '<' || string[i - 1] === '?') {
				leftDp[i] = leftDp[i - 1] + 1
			}
	}
	
	// surfix
	for (let i = size - 2; i > 0; i--) {
		if (string[i + 1] === '>' || string[i + 1] === '?') {
			rightDp[i] = rightDp[i + 1] + 1
		}
	}
	
	for (let i = 0; i < string.length; i++) {
		let cur = string[i]
		if (cur === '?') {
			if (leftDp[i] < rightDp[i]) {
				cur = '<'
			} else if (leftDp[i] > rightDp[i]) {
				cur = '>'
			} else {
				if (leftSize > 0) {
					cur = '>'
				} else {
					cur = '<'
				}
			}
		}
		
		if (cur === '<') {
			if (symmetryStringSize !== 0) {
				leftSize = 1
				symmetryStringSize = 0
			} else {
				leftSize++
			}
		} else if (cur === '>') {
			if (leftSize > 0) {
					leftSize--
					symmetryStringSize+=2
					result = Math.max(result, symmetryStringSize)
			} else {
					symmetryStringSize = 0
			}
		}
	}
	return result
}
	
	
function main() {
	console.log(getLongestSymmetrySubstring('<<>>') === 4)
	console.log(getLongestSymmetrySubstring('>><<') === 0)
	console.log(getLongestSymmetrySubstring('<><<<<><<<>') === 2)
	console.log(getLongestSymmetrySubstring('<><><<<>>>') === 6)
	console.log(getLongestSymmetrySubstring('<>>>>>>>') === 2)
	console.log(getLongestSymmetrySubstring('<>??>>') === 4)
	console.log(getLongestSymmetrySubstring('??????') === 6)
	console.log(getLongestSymmetrySubstring('?<?>?<') === 4)
	console.log(getLongestSymmetrySubstring('<??>') === 4)
	console.log(getLongestSymmetrySubstring('<?') === 2)
}

main()
