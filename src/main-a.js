//
// ES2015
//
import answer from 'the-answer';
import add from './calculator';

//
// @rollup/plugin-node-resolve test
//
const result = add(1, answer);
console.log(result);

// import add from './calculator';

// //
// // @rollup/plugin-node-resolve test
// //
// const result = add(1, 3);
// console.log(result);
