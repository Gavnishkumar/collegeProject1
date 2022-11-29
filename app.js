const express= require("express");
const app=express();
const bodyparser = require("body-parser");
const https = require("https");
const fetch = require('node-fetch');

const { features } = require("process");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

// All variable declaration
 let searchArr=[];
app.get("/",function(req,res){
    res.render("home");
})
app.get("/search-on-map",function(req,res){
    res.render("map");
})


// this is api section

app.post("/",function(req,res){
	const query=req.body.search;
	const appikey="52aea8bde0984400bf25353183f920ab#";
	const place_id="51aaedcb3e344e53405997ae4cfad6a63c40f00103f9013a5b13a10000000092030544656c6869"
	console.log(query);
	const url="https://api.geoapify.com/v2/places?categories=catering.fast_food&filter=place:"+ place_id +"&limit=20&apiKey="+ appikey;
	https.get(url, function(response){
		console.log(response.statusCode);
        let data=[];
        response.on("data",chunk=>{
            data.push(chunk);
        })
		response.on("end", function(Features){
			
 const user=JSON.parse(Buffer.concat(data).toString());
        searchArr=user.features;
		console.log(url);
//  user.features.forEach(element => {

//     console.log(element.properties.name)
//  });
			res.send();
		})
        res.redirect("/food-help");
	})
	
})
//   api section close

// for results of search
app.get("/Food-help",function(req,res){
	res.render("food",{dataArr:searchArr});
});





app.listen("3000",function(){
    console.log("server is started ");
})