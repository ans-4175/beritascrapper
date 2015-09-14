module.exports = function() {

    "use strict";

    require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');        
    var cheerio = require('cheerio');
    var moment = require('moment');
    var parseString = require('xml2js').parseString;

  /*  var getNewsDetailsDetik = function(html) {

        var $ = cheerio.load(html);

        var img = $('div.teaser>img.image').attr('src');

        if (typeof img === 'undefined') {

            img = "http://placehold.it/350x150";

        }

        /*Take only the first paragraph */
        /*var news = $('div.span-13.last p:nth-child(2)').html();

        return [news, img];

    };*/


    request('http://detik.feedsportal.com/c/33613/f/656082/index.rss')
           .then(function(xml) {

                parseString(xml, function (err, result) {                    
                    
                var news = result.rss.channel[0].item;                

                news.forEach(function(item, index){                        

                        var image;

                        if(typeof item.enclosure !== 'undefined') { // checks if image is present 
                            
                            image = item.enclosure[0].$.url +'?w=450&q=150' ;
                        
                        }else {
                            image = 'http://news.detik.com/images/logodetiknews.png';
                        }         

                        parseString(item.guid, function(err,resp) {
                            console.log(resp);
                        });


                       /*     News.findOneAndUpdate({
                                        Title: item.title[0]
                                    }, {
                                        Title: item.title[0],
                                        SiteName: 'Detik',
                                        Url: item.link[0],
                                        Summary: item.description,
                                        Image: 'http://jakartaglobe.beritasatu.com/assets/desktop/images/footer/logo.png'
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('JKGlobe scrapper');
                                    });*/
                                
                    });              

                });

           })



    

}