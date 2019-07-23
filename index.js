const http = require('http');
const fs = require('fs');
// const path = require('path');
var htmlFile;
var mainCss;
var page2;
var page3;
var page404;
var logdata;
const server = http.createServer((req, res)=>{
    var timeNow = new Date();
    
    fs.appendFile('main.log', req.url + ' page loaded at ' + timeNow + '\r\n' , function (err){
        if(err) throw err;
        console.log(req.url + ' page loaded at' + timeNow);
    });

    console.log('check does work two fs.readfile');
    switch(req.url){
        
        case '/main.css':
            fs.readFile('./public/main.css','utf-8', function(err, data){
                mainCss = data;
            });
            res.writeHead(200, {"Content-Type":"text/css"});
            res.end(mainCss);
            break;     
        case '/page2.html':
            fs.readFile('./public/page2.html','utf-8', function(err, data){
                if(err) throw err;
                page2 = data;
            });
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(page2);  
    
        case '/page3.html':
            fs.readFile('./page3.html','utf-8', function(err, data){
                page3 = data;
            });
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(page3);
        case '/logs.html':
            // fs.readFile('./public/logs.html','utf-8', function(err, data){
            //     logsPage = data;
            // });
            res.writeHead(200, {"Content-Type":"text/html"});
            fs.readFile('./main.log',(err,data)=>{
                logdata = data;
            });                                                 
            res.end(logdata);
           
        case '/':
                fs.readFile('./public/index.html','utf-8', function(err, data){
                    if(err) throw err;
                    htmlFile = data;
                });
                res.writeHead(200, {"Content-Type":"text/html"});
                res.end(htmlFile);
        case '/index.html':
            fs.readFile('./public/index.html','utf-8', function(err, data){
                if(err) throw err;
                htmlFile = data;
            });
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(htmlFile);                
        default:
            fs.readFile('./public/404.html','utf-8', function(err, data){
                page404 = data;
            });
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(page404);
                        
    }
    res.end();
})  

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log('Server succesfully started, listening on 3000 port');  
})
