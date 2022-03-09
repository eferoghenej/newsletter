const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
})

// app.get("/success.html", (req, res) =>{
//     res.send("Success");
// })

//Setting up MailChimp
mailchimp.setConfig({
    apiKey: "cec04176707e3ffc35190aa675293ae0-us14",
    server: "us14"
    });

app.post("/", (req, res) => {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const listID = "f9fc6216f";
    // Creating an object with the users data
    // const subscribingUser = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email
    // };

    //Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listID, {
         email_address: email,
         status: "subscribed",
         merge_fields: {
         FNAME: firstName,
         LNAME: lastName
        }
        });
        //If all goes well logging the contact's id
        
        };
        run();
        if(res.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
            console.log("Successfully added contact");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        // res.sendFile(__dirname + "/success.html")
        // console.log("Successfully added contact");
        // run().catch(e => res.sendFile(__dirname + "/failure.html"));
       
    });

    
app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || port, () =>{
    console.log("Server is up and running");
})

//API Key
// cec04176707e3ffc35190aa675293ae0-us14

//List/ Audience ID
// f9fc6216f0