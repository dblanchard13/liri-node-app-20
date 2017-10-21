
var action=process.argv[2];

 
//Twitter NPM--------
var Twitter =require('twitter')
var config = require("./key.js")
var key =new Twitter(config)
var params ={count:20}

//Spotify NPM--------
var Spotify = require('node-spotify-api');

var spotify= new Spotify({
id:"f4745dc2e98147c398744914a3bb3787",
secret:"2d5bd77b4d8c420c8c9cbfd7e6397899"});

function spotifySearch(songName){
	spotify.search({ type: 'track', query: songName,limit:1})
	  .then(function(response) {

	
	    data = response.tracks.items
	    for (var key in data){
	    	data[key].name
	    	
	    	console.log("Artist:"+data[key].artists[0].name+"\n-----------------------"); 
            console.log("Song's name:"+data[key].name+"\n-----------------------");
            console.log("Preview URL:"+data[key].preview_url+"\n-----------------------");
            console.log("Album:"+data[key].album.name+"\n-----------------------"); 

	    }
	  })
	  .catch(function(err) {
	    console.log(err);
  });
}

//Request for omdb movie
var request = require('request');

//Twitter------
if(action=='my-tweets'){
	
key.get('statuses/home_timeline',params,function(error,data,response){
	if(!error){
		for(i=0;i<data.length;i++){
			var x=i+1
		console.log("Your tweets"+[x]+":"+data[i].text+"\n-----------------------")
	 }
	}
})
}



//Spotify NPM--------
 else if (action=='spotify-this-song'){
 	var songName=process.argv[3];
 	if(songName==undefined)
      {var songName="The Sign"}
 	spotifySearch(songName)
 }


//omdb movie-------
  else if(action=='movie-this'){
  	var movieName=process.argv[3];
     if(movieName==undefined)
      {var movieName="mr.nobody"}
  request("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title of the movie: " + JSON.parse(body).Title+"\n-----------------------")
    console.log("Year release: " + JSON.parse(body).Year+"\n-----------------------")
    console.log("IMDB rating is: " + JSON.parse(body).imdbRating+"\n-----------------------")
    console.log("Rotten Tomatoes rating is:"+JSON.parse(body).Ratings[1].Value+"\n-----------------------")
    console.log("Country producted: " + JSON.parse(body).Country+"\n-----------------------")
    console.log("Language: " + JSON.parse(body).Language+"\n-----------------------")
    console.log("Plot: " + JSON.parse(body).Plot+"\n-----------------------");
    console.log("Actors: " + JSON.parse(body).Actors+"\n-----------------------");

  }
});


  }


 else if (action=='do-what-it-says'){

var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

  
  if (error) {
    return console.log(error);
  }
 console.log()
 data= data.split(',')
 spotifySearch(data[1]);

  // We will then print the contents of data
 // else (action=)

 });

};

