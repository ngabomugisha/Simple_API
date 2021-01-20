import Express from 'express';
import fs from 'fs';
const app = Express();


let obj;
fs.readFile('./data.json', 'utf8', (err, data)=> {
  if (err) throw err;
  obj = JSON.parse(data);
});

// return whole country data
app.get('/', (req, res) => {
     res.json(obj);
});

// return province level data
app.get('/api/:province_name', (req, res) => {
     res.json(obj.find((province)=>{
         return req.params.province_name.toLowerCase() === province.name.toLowerCase();
     }));
});

//return district level data
app.get('/api/:province_name/:district_name', (req, res) => {
     const prov = obj.find((province)=>{
         return req.params.province_name.toLowerCase() === province.name.toLowerCase();
     });
     const dist = prov.districts.find((distr)=>{
         return req.params.district_name.toLowerCase() === distr.name.toLowerCase();
     });
      res.json(dist);
});

//return sector level data
app.get('/api/:province_name/:district_name/:sector_name', (req, res) => {
    
    const prov = obj.find((province)=>{
        return req.params.province_name.toLowerCase() === province.name.toLowerCase();
    });
    const dist = prov.districts.find((distr)=>{
        return req.params.district_name.toLowerCase() === distr.name.toLowerCase();
    });
    const sect = dist.sectors.find(sec=>{
        return req.params.sector_name.toLowerCase() === sec.name.toLowerCase();
    })

      res.json(sect);
});

//return cells(Akagari) level data
app.get('/api/:province_name/:district_name/:sector_name/:cell_name', (req, res) => {
    
    const prov = obj.find((province)=>{
        return req.params.province_name.toLowerCase() === province.name.toLowerCase();
    });
    const dist = prov.districts.find((distr)=>{
        return req.params.district_name.toLowerCase() === distr.name.toLowerCase();
    });
    const sect = dist.sectors.find(sec=>{
        return req.params.sector_name.toLowerCase() === sec.name.toLowerCase();
    })
    const cel = sect.cells.find(cell=>{
        return req.params.cell_name.toLowerCase() === cell.name.toLowerCase();
    })

      res.json(cel);
});

//return villages(Umugugudu) level data
app.get('/api/:province_name/:district_name/:sector_name/:cell_name/:village_name', (req, res) => {
    
    const prov = obj.find((province)=>{
        return req.params.province_name.toLowerCase() === province.name.toLowerCase();
    });
    const dist = prov.districts.find((distr)=>{
        return req.params.district_name.toLowerCase() === distr.name.toLowerCase();
    });
    const sect = dist.sectors.find(sec=>{
        return req.params.sector_name.toLowerCase() === sec.name.toLowerCase();
    })
    const cel = sect.cells.find(cell=>{
        return req.params.cell_name.toLowerCase() === cell.name.toLowerCase();
    })
    const villages = cel.villages.find(village=>{
        return req.params.village_name.toLowerCase() === village.name.toLowerCase();
    })

      res.json(villages);
});

const PORT = process.env.PORT;
app.listen(5000 || PORT, () => {
    console.log(`Server started on port`);
});
