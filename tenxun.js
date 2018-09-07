var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs")
var file = []
var getNewsDetail=function (newsID) {
    //腾讯
    request('https://film.qq.com/', function (err,res) {
        if (err) return console.error(err);
        var $ = cheerio.load(res.body.toString());
        file = []
        
        $('body').children().find('.list_item').find('.figure').each(function(){
            
            if($(this)[0].attribs['data-stat-f_module']=="VIP电视剧"){
                console.log($(this)[0].children[0].next.attribs)
                var t;
                if($(this)[0].children[0].next.attribs.lz_src){
                    t = '{'+
                        '"title":"'+($(this)[0].children[0].next.attribs.alt).toString()+'",'+
                        '"url":"'+($(this)[0].attribs.href).toString()+'",'+

                        '"imgs":"'+($(this)[0].children[0].next.attribs.lz_src).toString()+'"'+
                    '}'
                }else if($(this)[0].children[0].next.attribs['data-lz-src']){
                    t = '{'+
                        '"title":"'+($(this)[0].children[0].next.attribs.alt).toString()+'",'+
                        '"url":"'+($(this)[0].attribs.href).toString()+'",'+

                        '"imgs":"'+($(this)[0].children[0].next.attribs['data-lz-src']).toString()+'"'+
                    '}'
                }else{
                    t = '{'+
                        '"title":"'+($(this)[0].children[0].next.attribs.alt).toString()+'",'+
                        '"url":"'+($(this)[0].attribs.href).toString()+'",'+

                        '"imgs":"i.gtimg.cn/qqlive/images/20150608/pic_v.png"'+
                    '}'
                }
                
                file.push(t)
            }
        })
        fs.writeFile('tx.json', '['+file+']',  function(err) {
            if (err) {
                console.log("cuowu")
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线--------")
            console.log("读取写入的数据！");
            fs.readFile('input.json', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("异步读取文件数据: " + data.toString());
            });
        });

    });
    
};

//getNewsList();
getNewsDetail();