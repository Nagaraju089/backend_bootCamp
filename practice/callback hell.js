const fs = require('fs');
fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
        console.log(data3);

        fs.writeFile('./txt/final.txt' , ` ${data2} \n ${data3} ` , 'utf-8' , (err)=> {

            // to write file

           console.log("you file has been written 😀 ");
        });
      });
});
