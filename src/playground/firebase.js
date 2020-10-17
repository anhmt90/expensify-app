// since firebase doesn't have default export, we dump all its named exports on `firebase` using `* as firebase`
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDX1VNKhQ9IoKxCeQVoRyOzxXVSYntHYKk",
    authDomain: "expensify-b2701.firebaseapp.com",
    databaseURL: "https://expensify-b2701.firebaseio.com",
    projectId: "expensify-b2701",
    storageBucket: "expensify-b2701.appspot.com",
    messagingSenderId: "1021836864156",
    appId: "1:1021836864156:web:4c44688a84c3886f869b59",
    measurementId: "G-ZK7H63LPV5"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

/**
 * firebase composes of many features, db is one of those => .database() to use db related features
 * ref() without passing any params refers to root of the db
 * set() can take any datatype, not just objects. set() is **asynchronous** => use Promises
 */
const database = firebase.database();

// firebase.database().ref('attribute').set({
//     height: 170,
//     weight: 60
// }).then(() => {
//     console.log('>>> SUCCESS!')
// }).catch((err) => {
//     console.log('>>> FAILED!', err)
// });

/**
 * READING the data ONCE
 */
// database.ref('attribute/height').once('value')
// .then((snapshot) =>{
//     const val = snapshot.val();
//     console.log(val)
// }).catch((e) => {
//     console.log('>>> FAILED: ', e)
// });

/**
 * READING the data and SUBSCRIBE for its changes
 * 
 * on() take the second arg as a callback function which will be called repeatedly once the fetched data gets changed
 * thus, no promises being used, because  promises can only be resolved or rejected a single time with a single value
 */
const onValueChange =  database.ref('attribute').on('value', (snapshot) => {
    console.log(snapshot.val());
}, (e) => {
    console.log('Error occured when fetching data', e)
});

/**
 * Here we can see the notification when 'attribute' field gets changed
 */
setTimeout(() => {
    database.ref('attribute/hairColor').set('black')
}, 3000)

/**
 * UNSUBSCRIBE from data changes
 */
setTimeout(() => {
    database.ref().off('value', onValueChange)
}, 3000)


/*********************************************** */
db.ref().remove();
db.ref('expenses').push(expenses[1]);
db.ref('expenses').push(expenses[2]);
db.ref('expenses').push(expenses[0]);

db.ref('expenses').on('value', (snapshot) => {
    const expenses_ = [];
    snapshot.forEach((childSnapshot) => {
        expenses_.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
    console.log(expenses_);
});

db.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val);
});

db.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val);
});

db.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val);
});