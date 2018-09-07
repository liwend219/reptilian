var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');
var fs = require("fs")
var file = []
var getNewsDetail=function (newsID) {
    
    //优酷
    //1. https://list.youku.com/category/show/c_96_s_1_d_1_p_1.html?spm=a2h1n.8251845.0.0
    //2. https://list.youku.com/category/show/c_96_s_1_d_1_p_2.html?spm=a2h1n.8251845.0.0
    //3. https://list.youku.com/category/show/c_96_s_1_d_1_p_3.html?spm=a2h1n.8251845.0.0
    //4. https://list.youku.com/category/show/c_96_s_1_d_1_p_4.html?spm=a2h1n.8251845.0.0


    request('https://list.youku.com/category/show/c_96_s_1_d_1_p_5.html?spm=a2h1n.8251845.0.0', function (err,res) {
        if (err){
            console.error(err);
            return 
        }
        var $ = cheerio.load(res.body.toString());
        $('body').children().find('.yk-pack').find('.p-thumb').each(function(){
            var t ={
                "title":'',
                "url":'',
                "imgs":'',
            };
            $(this)[0].children.map(val => {
                
                
                if(val.name == 'a'){
                    t.title = val.attribs.title.toString()
                    if(val.attribs.href.slice(0,2) == '//'){
                        t.url = val.attribs.href.slice(2).toString()
                    }else{
                        t.url = val.attribs.href.toString()
                    }
                    console.log(t.url)
                    console.log('-------------')
                }
                if(val.name == 'img'){
                    t.imgs = val.attribs.src.toString()
                }

                if(val.name == 'a'){
                    t.title = val.attribs.title.toString()
                    if(val.attribs.href.slice(0,2) == '//'){
                        t.url = val.attribs.href.slice(2).toString()
                    }else{
                        t.url = val.attribs.href.toString()
                    }
                    
                }
                if(val.name == 'img'){
                    t.imgs = val.attribs.src.toString()
                }
                
            })
            let t2 = '{'+
                '"title":"'+t.title.toString()+'",'+
                '"url":"'+t.url.toString()+'",'+
                '"imgs":"'+t.imgs.toString()+'"}'
            file.push(t2)
            
        })
        fs.writeFile('yk2.json', '['+file+']',  function(err) {
            if (err) {
                console.log("err")
                return console.error(err);
            }
            console.log("数据写入成功！");
        });
    });
};
//getNewsList();
getNewsDetail();