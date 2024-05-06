const express = require('express');
const auth = require('./middlewer/AuthMdlwr');
const dotenv = require('dotenv');
const cors = require('cors');
const UserCntrl = require('./control/Users');
const NoteCntrl = require('./control/Note');
const setupSwagger = require('./swagger/Swagger');
dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

setupSwagger(app, PORT);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/api/user', UserCntrl); 
app.use('/api/notes', auth, NoteCntrl);
