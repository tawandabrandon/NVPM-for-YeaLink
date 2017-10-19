//Docs & Todo
//-Protect SQL Queries from injection; raw input
//-API key generation; from DB? or Auth
//-Add Auth 

var express = require('express');
var builder = require('xmlbuilder');
var router = express.Router();
var db = require('./db');
var Contact = require('./contact');

/* GET Contacts listing. */
router.get('/', function(req, res, next) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured" + err);
        } else {
            console.log("Connected!");
        }
    });

    var sql = "Select * FROM contacts";

    db.con.query(sql, function(err, result) {
        if (err) {
            //console.log('An error occured while executing query');
            //console.log(err); 
        } else {
            //console.log("1 record Found");
            res.json(result);
        }

    });
});

router.get('/show/:phone', function(req, res, next) {
    phone = req.params.phone;
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
        }
    });

    var sql = "Select * FROM contacts WHERE phone = " + phone + "";

    db.con.query(sql, function(err, result) {
        if (err) {
            //console.log('An error occured while executing query');
            //console.log(err); 
        } else {
            //console.log("1 record Found");
            res.sendStatus(200);
            res.json(result);
        }

    });
})

router.get('/search/:searchTerm', function(req, res, next) {
    var searchTerm = req.param('searchTerm');
    db.con.connect(function(err) {
        db.con.query("SELECT * FROM contacts WHERE name = '" + searchTerm + "' OR company ='" + searchTerm + "' OR phone = '" + searchTerm + "'", function(err, result) {
            if (err) {
                return {
                    'error': 'No Contact Found'
                };
            } else {
                searchResult = result;
                res.json(result);
            }
        })
    })
})

router.get('/delete/:phone', function(req, res, next) {
    var delPhone = req.params.phone;
    deleteContact(delPhone);
    res.end('Deleted record');
})

router.get('/new/:name/:company/:phone', function(req, res) {
    var newContact = new Contact(req.params.name, req.params.company, req.params.phone);
    console.log(saveToDb(newContact));
    res.end('Done');
});

router.get('/phone', function(req, res, next) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
        }
    });

    var sql = "Select * FROM contacts";

    db.con.query(sql, function(err, result) {
        if (err) {
            //console.log('An error occured while executing query');
            //console.log(err); 
        } else {
            genXml = xmlGen(result);
            res.set({
                'Content-Type': 'application/force-download',
                'Content-disposition': 'attachment; filename=phone.xml'
            });
            res.send(genXml);
        }

    });
});

function search(searchTerm) {
    var searchResult = {};

}

function deleteContact(phone) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
        }
    });
    var sql = "DELETE FROM contacts WHERE phone = " + phone + " LIMIT 1";


    db.con.query(sql, function(err, result) {
        if (err) {
            console.log('An error occured while executing query');
            console.log(err);
        } else {
            console.log("1 record Deleted");
            console.log(result);
        }

    });
}

function showContact(phone, res) {


}

function getContacts() {
    ContactList = {}
    return ContactList();
}

function xmlGen(list) {

    var xml = builder.create('xxxIPPhoneDirectory');

    j = list.length

    for (i = 0; i < j; i++) {
        tD = builder.create('TelephoneDirectory');
        Nm = builder.create('Name').t(list[i].name + ' ' + list[i].company);
        tP = builder.create('Telephone').t('' + list[i].phone);

        tD.importDocument(Nm);
        tD.importDocument(tP);
        xml.importDocument(tD);
    }

    afterGen = xml.end({
        pretty: true,
        indent: '  ',
        newline: '\n',
        allowEmpty: false,
        spacebeforeslash: ''
    });
    return afterGen;
}

function saveToDb(contact) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured");
            return "an error has occured";
        } else {
            console.log("Connected!");
        }
    });

    var sql = "INSERT INTO contacts (name, company, phone) VALUES ('" + contact.name + "','" + contact.company + "','" + contact.phone + "')";
    console.log(sql);
    db.con.query(sql, function(err, result) {
        if (err) {
            console.log('An error occured while executing query');
            console.log(err);
            return "An error occured while executing query, check log for details";
        }
        console.log("1 record inserted");
        console.log(result);
        return "New contact created: " + contact.name + ', ' + contact.company + ', ' + contact.phone + "";
    });
}
module.exports = router;