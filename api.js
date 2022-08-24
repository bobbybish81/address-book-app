const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const cors = require("cors");
const corsOptions ={ 
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.urlencoded({ extended: true }))

const db = [
  {
    id: 1,
    name: 'Robert Bish',
    address: '46 Easthill Drive',
    city: 'Brighton',
    email: 'robert@hotmail.com',
    telNo: '+441273881778'
  },
  {
    id: 2,
    name: 'Simon Boyden',
    address: '45 Cavern Street',
    city: 'Liverpool',
    email: 'simon@gmail.com',
    telNo: '+441515263789'
  },
  {
    id: 3,
    name: 'James Davis',
    address: '12 High Grove',
    city: 'London',
    email: 'james@yahoo.com',
    telNo: '+442087915236'
  },
  {
    id: 4,
    name: 'Mark Parsons',
    address: '5 Hangleton Way',
    city: 'Littlehampton',
    email: 'markparsons@hotmail.com',
    telNo: '+441793584362'
  },
  {
    id: 5,
    name: 'Oliver Whitby',
    address: '62 Sheldale Crescent',
    city: 'Portsmouth',
    email: 'oliver@disney.com',
    telNo: '+441803456921'
  }
];

app.get('/api/addressbook', (req, res) => {
  return db ?
    res
    .json(db)
    .status(200):
    res.status(404).end(); // condition ? truthy-part : falsy-part

});

app.get('/api/addressbook/:name', (req, res) => {
  const contact = db.find(contact => contact.name == req.params.name);
  return contact ?
    res.json(contact) :
    res.status(404).end(); // condition ? truthy-part : falsy-part
});

app.post('/api/addressbook', (req, res) => {
    const newContact = {
    id: db.length + 1,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    email: req.body.email,
    telNo: req.body.telNo,
  };
  db.push(newContact);
  res
    .status(201)
    .setHeader('location', `/api/addressbook/${newContact.id}`)
    .json(newContact);
});

app.delete('/api/addressbook/:name', (req, res) => {
  const contactDelete = db.findIndex(contact => contact.name == req.params.name);
    return db.splice(contactDelete, 1) ?
      res
      .json(db)
      .status(204):
      res.status(404).end(); // condition ? truthy-part : falsy-part
});

app.patch('/api/addressbook/:name', (req, res) => {
  const index = db.findIndex(contact => contact.name == contact.params.name);
    db[index].name = req.body.name;
    db[index].address = req.body.address;
    db[index].city = req.body.city;
    db[index].email = req.body.email;
    db[index].telNo = req.body.telNo;
  return db ?
      res
      .json(db[index])
      .status(201):
      res.status(404).end(); // condition ? truthy-part : falsy-part
});

module.exports = {
    app,
    port
  }