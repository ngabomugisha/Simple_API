import Express from 'express';
import fs from 'fs';
const app = Express();


let obj;
fs.readFile('./data.json', 'utf8', (err, data)=> {
  if (err) throw err;
  obj = JSON.parse(data);
});




app.get('/', (req, res) => {
     res.json(obj);
});

app.get('/:id', (req, res) => {
     res.json(obj.find((province)=>{
         return +req.params.id === province.id;
     }));
});


app.listen(5000, () => {
    console.log(`Server started on port`);
});