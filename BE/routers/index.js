const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const documentRoute = require("./document.route");
const globalRoute = require("./global.route");
const adminRoute = require("./admin.route");

Route = (app) => {
    app.use("/admin", adminRoute);
    app.use("/auth", authRoute);
    app.use("/user", userRoute);
    app.use("/document", documentRoute);
    app.use("/", globalRoute);
};

module.exports = Route;
