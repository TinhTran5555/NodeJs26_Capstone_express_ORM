const express = require('express');
const {sequelize} = require('./models')

const {handleErrors} = require('./helpers/error');
const configs = require('./config');
const server = express()
const app = express();
app.use(express.json());
app.use(express.static('.'));

sequelize.sync({ alter: true });

const v1 = require('./routers/v1');
app.use('/capstone/v1',v1);

app.use(handleErrors);

app.listen(configs.PORT);
// const express = require('express');
// const server = express()
// server.use((req,res)=> {
//     res.send("hello")
// })
// const PORT = process.env.PORT || 3000
// server.listen(PORT,()=>{
//     console.log("server connect tinhtran");
// })