/**
 * Promise takes a function running a long asynchronous task. Once it's done, we can call  
 * resolve() meaning the task was successful, else we call reject()
 * 
 * Normally, creating Promises is the task of the db, and so we won't we such code in our project
 * but rather, we use those Promises by registering callbacks
 */

 /** RESOLVE */
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Tuan Anh',
            age: 30
        });
        resolve('This is my other resolved data'); // will be ignored since can only be either resolved or rejected
    }, 1500);
});

/** REJECT */
// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Something went wrong');
//     }, 1500);
// });

console.log('before');

/**
 * promise.then(func) to register a callback tha will be called after the asynchronous task is done
 * func taks a param, which is the data we passed to resolve()
 */
promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error', error)
});


/**
 * Promise chaining demo
 */
promise.then((data) => {
    console.log('2', data);
    return 'data returned from 1st then'
}).then((returnedFrom1stThen) => {
    console.log('this second "then" will then run, and print ', returnedFrom1stThen);
});

console.log('after');