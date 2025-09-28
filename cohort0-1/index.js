console.log("hello world !")

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Enter your name: ', (name) => {
//   console.log(`Hello, ${name}!`);
//   rl.close();
// });

// 3rd party module  command : npm install prompt-sync


// const prompt = require('prompt-sync')();;
// const name = prompt('Enter your name: ');
// console.log(`Hello, ${name}!`);


//  grete based on their gender
const prompt = require('prompt-sync')();
const gender =prompt('enter your gender (M/F): ')

if(gender === 'M' || gender === 'm'){
    console.log('Hello, Sir !')
}
else if(gender === 'F' || gender === 'f'){
    console.log('Hello, Maam !')
}
else {
    console.log('Hello, there !')
}