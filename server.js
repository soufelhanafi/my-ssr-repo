let express = require('express');
let compression = require('compression');


let app= express();

app.use(compression());
app.use(express.static(__dirname + '/dist/maritymain'));

app.get('/*',(req,res)=>{
    res.sendFile(__dirname + '/dist/maritymain/index.html');
})

app.listen(process.env.PORT || 8080 ,()=>{
    console.log('listening on port 8080');
})