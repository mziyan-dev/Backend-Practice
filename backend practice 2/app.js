// const fs = require("fs");
const HTTP = require("http");

// fs.writeFile("hey.text"," ziyan here",function (err) {
//     if(err) console.log(err);
//     else console.log("done");


// })

// fs.appendFile("hey.text"," ziyan here",function (err) {
//     if(err) console.log(err);
//     else console.log("done");


// })

// fs.rename("hey.text"," hello",function (err) {
//     if(err) console.log(err);
//     else console.log("done");


// })
// fs.copyFile("hey.text","./copy/hello.txt",function (err) {
//     if(err) console.log(err);
//     else console.log("done");


// })
// fs.copyFile("hey.text","./copy/hello.txt", (err) => {
//     if (err) console.log(err.message);
//     else console.log("done");
// });


// fs.unlink("hey.txt",(err) => {
//     if (err) console.log(err);
//     else console.log("removed");
// });


// fs.rmdir("./copy",{recursive : true},function(err){
//   if(err) console.log(err);
//   else console.log("removed");


// })


// ---------------------------------------------------- reating HTTP Server ---------------------------------------------------///


const srever = HTTP.createServer(function (req, res) {
  res.end("hello world")
})


srever.listen(3000)