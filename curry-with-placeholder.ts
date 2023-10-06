const __ = Symbol('PLACEHOLDER');

function placeholder(fn: (...args: any[]) => any, ...bound: any[]): (...args: any[]) => any {
  // show me your code
  const originFnLength = fn.length
  
  let isInit = false
  
  return function curry(...args): any {
    let preArgs: Array<any>
    let curArgs: Array<any>
      
    if (isInit) {
      preArgs = args[0]
      curArgs = args.slice(1, args.length)
    } else {
      preArgs = bound
      curArgs = args
      isInit = true
    }

    let nextAllArgs: Array<any>
    
    let index = 0
    let validArgIndex = 0
    while (index < preArgs.length) {
        if (preArgs[index] === __) {
            preArgs[index] = curArgs[validArgIndex]
            curArgs[validArgIndex] = undefined
            validArgIndex++
        }
        index++
    }

    nextAllArgs = preArgs.concat(curArgs.filter(a => a !== undefined))
    
    const validArgs = nextAllArgs.filter(a => a !== __)

    if (validArgs.length >= originFnLength) {
      isInit = false
      return fn.apply(null, validArgs)
    } else {
      return curry.bind(null, nextAllArgs)
    }
  }
}

declare const require: any;

function main() {
  function dot(x1: number, y1: number, x2: number, y2: number) {
    return x1 * x2 + y1 * y2;
  }
  const p1 = placeholder(dot, 3, 4)
  console.log('start!!!')
  console.log(typeof placeholder(dot, 2, __, __, 4) === 'function');
  console.log(placeholder(dot, 10, __, 10, __)(2, 3) === dot(10, 2, 10, 3));
  console.log(placeholder(dot, __, __, __, 5)(4, __, 2)(__)(3) === dot(4, 3, 2, 5));
  console.log(placeholder(dot, 3)(__, __)(4, __, 2)(3) === dot(3, 4, 3, 2));
  console.log(placeholder(dot)(3, __, __, 4)(5, 6) === dot(3, 5, 6, 4));
  console.log(placeholder(dot, 3, 4, 5, 3)() === dot(3, 4, 5, 3));
  console.log(p1(5, 6) === dot(3, 4, 5, 6));
  console.log(p1(7, 8) === dot(3, 4, 7, 8));
  console.log(p1(5)(6) === dot(3, 4, 5, 6));
  console.log(p1(7)(8) === dot(3, 4, 7, 8));
  console.log('PASSED!');
}

main()
