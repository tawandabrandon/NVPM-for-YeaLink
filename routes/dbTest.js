var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ":p",
  database: "Test"
});

function showContact(phone) {

  con.connect(function(err) {
    if (err){
      console.log("an error has occured")
    }else{
      console.log("Connected!");
    }
    });

    var sql = "Select * FROM contacts WHERE phone = "+phone+"";    

  con.query(sql, ans, function (err, result) {
    if (err){
       //console.log('An error occured while executing query');
       //console.log(err); 
    }else{
       //console.log("1 record Found");
       catchJson(result);
    }
    
    });
}

function catchJson(Jason){
  //console.log(Jason);
  r = "Chibaba";
}

var result = showContact('0696327134');