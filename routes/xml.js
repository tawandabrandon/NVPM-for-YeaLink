var builder = require('xmlbuilder');
var xml = builder.create('xxxIPPhoneDirectory')

list = []

j = list.length

for (i=0;i<j;i++){	
	tD = builder.create('TelephoneDirectory');
	Nm = builder.create('Name').t(list[i].Fname+' '+list[i].Lname);
	tP = builder.create('Telephone').t(''+list[i].phone);

	tD.importDocument(Nm)
	tD.importDocument(tP)
	xml.importDocument(tD)
}

console.log(xml.end({ 
  pretty: true,
  indent: '  ',
  newline: '\n',
  allowEmpty: false,
  spacebeforeslash: ''
}))