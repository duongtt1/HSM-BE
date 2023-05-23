require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require('http')
require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
// const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
// const multer = require("multer");
const socket = require("socket.io");
const errorHandler = require("./Apps/middlewares/error");
const DBConnection = require("./Apps/config/db");

DBConnection();

//require DB
require("./Apps/models/UserModel");
require("./Apps/models/AssignModel");
require("./Apps/models/AttendanceModel");
require("./Apps/models/ClassModel");
require("./Apps/models/DeviceModel");
require("./Apps/models/SubjectModel");
require("./Apps/models/QuetionModel");
require("./Apps/models/DocsModel");
require("./Apps/models/TranscriptModel");
require("./Apps/models/NotiModel");
require("./Apps/models/ClassRoomModel");

// Routes
const userRoutes = require("./Apps/routes/UserRoute")
const assignRoutes = require("./Apps/routes/AssignRoute")
const attendanceRoutes = require("./Apps/routes/AttendanceRoute")
const classRoutes = require("./Apps/routes/ClassRoute")
const deviceRoutes = require("./Apps/routes/DeviceRoute")
const subjectRoutes = require("./Apps/routes/SubjectRoute")
const quetionRoutes = require("./Apps/routes/QuetionRoute")
const docsRoutes = require("./Apps/routes/DocsRoute")
const transcriptRoutes = require("./Apps/routes/TranscriptRoute")
const notiRoutes = require("./Apps/routes/NotiRoute")
const classroomRoutes = require("./Apps/routes/ClassroomRoute")
const bootingRoutes = require("./Apps/routes/BootingRoute");
const ScheduleRoutes = require("./Apps/routes/ScheduleRoute");
const authRoutes = require("./Apps/routes/AuthRoute");

// init Epress App
const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Enable CORS
app.use(cors());
// Prevent http param pollution
app.use(hpp());

app.use(express.static(path.join(__dirname, "Apps/public")));
const versionOne = (routeName) => `/api/v1/${routeName}`;

// register routes
app.use(versionOne("user"), userRoutes);
app.use(versionOne("assign"), assignRoutes);
app.use(versionOne("attendance"), attendanceRoutes);
app.use(versionOne("class"), classRoutes);
app.use(versionOne("device"), deviceRoutes);
app.use(versionOne("subject"), subjectRoutes);
app.use(versionOne("quetion"), quetionRoutes);
app.use(versionOne("docs"), docsRoutes);
app.use(versionOne("transcript"), transcriptRoutes);
app.use(versionOne("notifications"), notiRoutes);
app.use(versionOne("classroom"), classroomRoutes);
app.use(versionOne("booting"), bootingRoutes);
app.use(versionOne("schedule"), ScheduleRoutes);
app.use(versionOne("auth"), authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = http.createServer(app);
const io = socket(server);

// socketio
const { verifyToken } = require("./Apps/Socket/middleware/auth")(io);
const { handleDisconnect } = require("./Apps/Socket/room/commom")(io);
const { setOnline, setOffline } = require("./Apps/Socket/user/userCtrl")();

io.use(verifyToken);

const onConnection = (socket) => {
    console.log(`Client with id: ${socket.deviceId} connected to server`.yellow.bold);
    setOnline(socket.deviceId);
    socket.on("tools:emit", (data) => {
        [channel, content] = data.split('_');
        io.emit(channel, content);
    });

    socket.on("disconnect", handleDisconnect);
}

io.on("connection", onConnection);

const serverProcess = server.listen(PORT, () => {
    console.log(
        `Server is running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
    console.log(
        `Socket Server is running ${process.env.NODE_ENV}:${PORT}`.blue.bold
    );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    serverProcess.close(() => process.exit(1));
});
