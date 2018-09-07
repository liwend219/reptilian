var cheerio = require('cheerio');
var rp = require('request-promise');
var yk2 = require('./yk2.json');
var fs = require("fs")
function runAsync1(url){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        rp('http://'+url).then(function(res){
        var $ = cheerio.load(res.toString());
            resolve($('body').find('.summary')[0].children[0].data)
        }).catch(function(err){
            reject(err)
        })
    });
    return p;            
}


var arr = []
for(let i=0; i<yk2.length;i++){
    runAsync1(yk2[i].url)
    .then(function(data){
        let str = data.replace(/\s*/g,"");
        
        let t = '{'+
        '"title":"'+yk2[i].title.toString()+'",'+
        '"url":"'+yk2[i].url.toString()+'",'+
        '"imgs":"'+yk2[i].imgs.toString()+'",'+
        '"brief":"'+str+'"}'
        arr.push(t)
        fs.writeFile('haha.json', arr,  function(err) {
            if (err) {
                console.log("err")
                return console.error(err);
            }
            console.log("数据写入成功！");
        });
    }).catch(function(err){
        console.log(err)
    }) 
}

