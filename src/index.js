console.log(`Promises & Asyn/Await`);

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


async function getUserData(id) {
    //validate id
    if (typeof id !== "number" || id < 1 || id > 10) {
        throw new Error('Invalid Input: ID must ne a number between 1 and 10')
    }
    //db objects
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };
    //accessing object properties with bracket notation, while function is in place of value instead of key, its invoking fuction to execute...
    //dbs[dbName] - This part retrieves the function
    //dbs[dbName]() - This calls (executes) the function

    try {

        //const dbName = await central(id); //get or select the db
        //const basicInfo = await dbs[dbName](id); //access the corresponding db
        //const personalInfo = await vault(id); //access vault db


        //combining 2 promises to promise.all()
        const dbName = await central(id); //get or select the db
        const [basicInfo, personalInfo] = await Promise.all([
            dbs[dbName](id),
            vault(id)
        ]);


        //given format of object(promise) to return
        return {
            id,
            name: personalInfo.name,
            username: basicInfo.username,
            email: personalInfo.email,
            address: {
                street: personalInfo.address.street,
                suite: personalInfo.address.suite,
                city: personalInfo.address.city,
                zipcode: personalInfo.address.zipcode,
                geo: {
                    lat: personalInfo.address.geo.lat,
                    lng: personalInfo.address.geo.lng
                }
            },
            phone: personalInfo.phone,
            website: basicInfo.website,
            company: {
                name: basicInfo.company.name,
                catchPhrase: basicInfo.company.catchPhrase,
                bs: basicInfo.company.bs
            }
        };
    } catch (err) {
        //When an error occurs, JavaScript creates an Error object, which has several properties: like name, message, stack...
        return Promise.reject(new Error(`Database Error: ${error.message}`));
    }

}
//handling promise
getUserData(1)
    .then(resolveData => console.log(resolveData))
    .catch(error => console.error(error));

//////////////////Part 2: The Implementation///////////

function getUserDataPromise(id) {

    if (typeof id !== 'number' || id < 1 || id > 10) {
        return Promise.reject('Invalid input -- Out of range');
    }

    //db objects
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    return central(id)
        .then(function (dbName) {
            return Promise.all([dbs[dbName](id), vault(id)]);
        })
        .then(function ([basicInfo, personalInfo]) {
            return {
                id,
                name: personalInfo.name,
                username: basicInfo.username,
                email: personalInfo.email,
                address: {
                    street: personalInfo.address.street,
                    suite: personalInfo.address.suite,
                    city: personalInfo.address.city,
                    zipcode: personalInfo.address.zipcode,
                    geo: {
                        lat: personalInfo.address.geo.lat,
                        lng: personalInfo.address.geo.lng
                    }
                },
                phone: personalInfo.phone,
                website: basicInfo.website,
                company: {
                    name: basicInfo.company.name,
                    catchPhrase: basicInfo.company.catchPhrase,
                    bs: basicInfo.company.bs
                }
            };
        }).catch(error => {
            return Promise.reject(`Error fetching user data: ${error.message}`);
        });

}

//.then(console.log)  // Logs the resolved value directly
//.catch(console.error); // Logs errors clearly
//getUserDataPromise(1).then(console.log).catch(console.error);
//getUserDataPromise(5).then(console.log).catch(console.error);
//getUserDataPromise(10).then(console.log).catch(console.error);

getUserDataPromise(9)
    .then(function (resolveVal) { console.log(resolveVal) })
    .catch(function (rejectVal) { console.error(rejectVal) });


// Invalid IDs
//getUserData(0).then(console.log).catch(console.error);
getUserDataPromise(11).then(console.log).catch(console.error);

// Invalid data types
getUserDataPromise("abc").then(console.log).catch(console.error);
getUserDataPromise(true).then(console.log).catch(console.error);





