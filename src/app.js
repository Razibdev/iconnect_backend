const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitization = require("express-mongo-sanitize");
const xss = require("xss-clean");
// const hpp = require("hpp");
const cors = require('cors');
const app = express();
app.use(express.static('public'));

const userRouter = require("./User/User.route");
const projectRoute = require("./Project/Project.route");
const blogRoute = require("./Blog/Blog.route");
const teamRoute = require("./Team/Team.route")

const path = require("path");

//set security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
const corsOrigin ={
    origin:['http://localhost:3000', 'http://efashionbd.com', 'https://efashionbd.com', 'https://www.efashionbd.com',  'http://www.efashionbd.com'], //or whatever port your frontend is using
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));


// app.use('/path_image_url',express.static(path.join(__dirname, 'src','uploads')));
app.use('/images',express.static(path.join(__dirname, "public")));

// Serve static files from the 'src/uploads' directory
// app.use('/images', express.static(path.join(__dirname, 'src', 'uploads')));
//Develoment Loging
if (process.env.NODE_ENV == "developement") {
    app.use(morgan("dev"));
}

// app.use(fileUpload({
//     useTempFiles: true
// }));

app.use(express.urlencoded({ extended: false }));
//Limit requests from same API
const limiter = rateLimit({
    max: 100000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, Please try againin an hour!",
});

app.use("/api", limiter);

//Body Parser, rading data form body into req.body
app.use(express.json({ limit: "100kb" }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitization());
//Data sanitization against xss
app.use(xss());
// Prevent parameter pollution
// app.use(
//     hpp({
//         whitelist: ["duration"],
//     })
// );

// route register here
app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/team", teamRoute);


// app.use('/*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/', (req, res, next) =>{
   res.send({'message': 'Hello app is running'});
});


module.exports = app;