const fs = require('fs');
const superagent = require('superagent');
fs.readFile('./dog.txt', (err , data) => {
    
        console.log(`Breed: ${data}`);

        superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then (res => {
            
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, (err) => {
                console.log("Dog image saved to file");
            })

           // fs.writeFile('dog-img.txt', res.body.message, err => {
                //console.log("New breed");
            }).catch(err =>
                console.log(err.message));
         });
   // });


        
