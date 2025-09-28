//  promise 
myPromisifiesdFunction = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve,duration);

    })
}

//  some async task 
  const ans = myPromisifiesdFunction(2000)
  ans.then(function() {
    console.log("task completed")
  })


console.log("hello world !")
  for (let i = 0; i < 10; i++) {
    console.log(i);
  
  }

  const ans2 = myPromisifiesdFunction(5000)
  ans2.then (function() {
    console.log("task 2 completed")
  })


  
console.log("hello world !")
  for (let i = 0; i < 10; i++) {
    console.log(i);
  
  }