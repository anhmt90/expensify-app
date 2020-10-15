const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // listen on dynamic port on Heroku but on port 3000 on local machine

const publicPath = path.join(__dirname, '..', 'public');

// this line should come before app.get()
app.use(express.static(publicPath));

// serve up index.html for unmatched URL paths
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});

app.listen(port, () => {
    console.log("Server is running");
});
