const express = require('express');
const cors = require('cors');
const connectDB = require('./mongoDB');
//---------------Routers-------------------
const LoginRouter = require('./Router/AuthRouter/LoginRouter');
const SignUpRouter = require('./Router/AuthRouter/SignUpRouter');
const CreateEmployeeRouter = require('./Router/CRUDRouter/CreateEmployeeRouter');
const ReadEmployeeRouter = require('./Router/CRUDRouter/ReadEmployeeRouter');
const UpdateEmployeeRouter = require('./Router/CRUDRouter/UpdateEmployeeRouter');
const DeleteEmployeeRouter = require('./Router/CRUDRouter/DeleteEmployeeRouter');
const OtherRouter = require('./Router/OtherRouter');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/',LoginRouter);
app.use('/',SignUpRouter);
app.use('/',CreateEmployeeRouter);
app.use('/',ReadEmployeeRouter);
app.use('/',UpdateEmployeeRouter);
app.use('/',DeleteEmployeeRouter);
app.use('/',OtherRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
