
var cheerio = require('cheerio');
var request = require('request');
var rp = require('request-promise');
var getNewsDetail=function () {
    // https://v.youku.com/v_show/id_XODAzMjQ3NTU2.html?spm=a2h1n.8251845.0.0
    // https://v.youku.com/v_show/id_XNDYzMTQyMDAw.html?spm=a2h1n.8251845.0.0
    // request('http://v.youku.com/v_show/id_XMzc5Njc5NjQ3Mg==.html', function (err,res) {
    //     if(err){
    //         return
    //     }
    //     var $ = cheerio.load(res.body.toString());
    //     console.log($('body'))
    // })
    rp('http://v.youku.com/v_show/id_XMzc5Njc5NjQ3Mg==.html').then(function(res){
        var $ = cheerio.load(res.toString());
        console.log($('body').find('.summary')[0].children[0].data)
    }).catch(function(err){
        console.log(err)
    })
};
getNewsDetail();