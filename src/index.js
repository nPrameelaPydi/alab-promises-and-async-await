console.log(`Promises & Asyn/Await`);

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


async function getUserData(id) {

    //validate id
    if (typeof id !== "number" || id < 1 || id > 10) {
        return Promise.reject(new Error("Invalid Input -- Out of Range"));
    }

    //db objects
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    try {
        const dbName = await central(id); //get or select the db
        const basicInfo = await dbs[dbName](id); //access the corresponding db
        const personalInfo = await vault(id); //access vault db

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
    .then(userData => console.log(userData))
    .catch(error => console.error(error));


