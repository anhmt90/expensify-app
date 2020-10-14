const person = {
    // name: "Tuan Anh",
    age: 30,
    location: {
        city: 'Munich',
        temp: 92
    }
}

const {name: firstName = 'defaultName', age} = person;
console.log(`${firstName} is ${age}`)

const {city, temp: temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`)
}

/*
    const book = {
        title: 'Ego is the empty',
        author: 'Ryan holiday',
        publisher: {
            name: 'Penguin'
        }
    };

    const {name: publisherRenamed = 'Self-Published'} = book.publisher;
    console.log(publisherRenamed)
*/


/********************* ARRAY DESTRUCTURING ***********************/

const address = ['Adolf-Kolpping-Str.', 'Munich', 'Bavaria', '80336'];
const [, myCity, myState = 'Hamburg'] = address;

console.log(`I'm in ${myCity} ${myState}`);
