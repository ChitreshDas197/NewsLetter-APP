const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//to serve static files like css, img etc
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    
    
    
});

app.post("/",  function(req, res) {
    const firstName =  req.body.firstName;
    const lastName = req.body.lastName;
    const emailID = req.body.emailId;

    const dataObj = {
        members : [ 
            {
                email_address : emailID,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                } 
            }
            
        ] 
    } ;

    const jsonData =  JSON.stringify(dataObj);

    const url = "https://us7.api.mailchimp.com/3.0/lists/643cb86805" ;

    const options = {
        method : "POST",
        auth : "chitreshD:Acebde0b96613d9adee1ded4f5bc95b98-us7"
    };

    const request = https.request(url, options, function(response) {
        const statusCode = response.statusCode;
        if (statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function(data) {
        //     console.log(JSON.parse(data));
        // })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});


//can listen on a dynamic port given by the hosting service or our local machine port
app.listen( process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
})







//list id
//643cb86805

// API Keys
// cebde0b96613d9adee1ded4f5bc95b98-us7