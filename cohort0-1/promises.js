// //  promise 
// myPromisifiesdFunction = (duration) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve,duration);

//     })
// }

// //  some async task 
//   const ans = myPromisifiesdFunction(2000)
//   ans.then(function() {
//     console.log("task completed")
//   })


// console.log("hello world !")
//   for (let i = 0; i < 10; i++) {
//     console.log(i);
  
//   }

//   const ans2 = myPromisifiesdFunction(5000)
//   ans2.then (function() {
//     console.log("task 2 completed")
//   })


  
// console.log("hello world !")
//   for (let i = 0; i < 10; i++) {
//     console.log(i);
  
//   }


  // creating a promis e
  let myPrmise = new Promise( function(res , rej){
    let success = false;

    if ( success){
      res("promise resolved")
    }
    else{
      rej("promise rejected")
    }
  })

  myPrmise
  .then(function(value){
    console.log(value);
  })
  .catch(function(error){
    console.log(error);
  });
  console.log(myPrmise);