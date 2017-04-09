const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));


//This is a test for github

app.listen(PORT, ()=>{
	console.log(publicPath+"/listening on "+PORT);
});