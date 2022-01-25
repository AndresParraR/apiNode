const express = require('express');
const requireDir = require('require-dir');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const app = express();
const http = require('http').Server(app);
const router = express.Router();

// const httpServer = require("http").createServer();

const controllers = requireDir('./controllers');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

var server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    credentials: false
  },
  allowEIO3: true
});

server.listen(4501, function () {
  console.log("Servidor corriendo en http://localhost:4501");
});

io.on('connection', async function (socket) {
  setInterval(function () {
    var coordinates={
      lat: parseFloat(getRandomValue(47.313000, 47.314000)),
      lng: parseFloat(getRandomValue(-1.319000, -1.319900)),
    }
    let someNewValues = new Array(7).fill(0).reduce((acc, el) => {
      return [...acc, Math.floor(getRandomValue(0, 101))]
    }, [])
    socket.emit('NEW_COORDINATES', coordinates);
    socket.emit('NEW_VALUES', someNewValues);
  }, 3000)
});

function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(4);
}

var corsOptions = {
  credentials: false,
  origin: true
}

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Briefcase API documentation Swagger',
      description: 'A simple Express Library API to Briefcase',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:5000",
      }
    ],
  },
  apis: ["./controllers/*.js"]
};

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors(corsOptions))

router.use('/user', controllers.UserController);
router.use('/role', controllers.RoleController);
router.use('/contact', controllers.ContactController);

app.use("/api", router);

app.get('/', function (req, res) {
  res.send('Briefcase API!');
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(function (req, res, next) {
  return res.status(404).json({ "Message": "Page not found." });
});

app.use(function (err, req, res, next) {
  return res.status(500).json({ error: err });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
})

module.exports = app;