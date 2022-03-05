const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { post } = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 

    var url ='https://us14.api.mailchimp.com/3.0/lists/3b1888ecb4';
    const options = {
        method: 'POST',
        auth: 'Usama1:ab327de073a4ce1e74c826825ff0c323-us14'
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + '/success.html');
        }else{
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post('/failure', function(req, res){
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is Up AND Running');
});

//API key
//ab327de073a4ce1e74c826825ff0c323-us14

//List ID of main Audience
//3b1888ecb4
