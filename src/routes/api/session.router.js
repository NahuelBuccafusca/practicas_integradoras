const express = require("express");
const passport = require("passport");
const sessionController = require("../../controllers/sessionController.js");

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "failregister",
  }),
  sessionController.register
);

router.get("/failregister", sessionController.failregister);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  sessionController.login
);

router.put("/change_password", sessionController.changePasswordPut);

router.get("/current", sessionController.current);

router.get("/faillogin", (req, res) => {
  res.render("login", {
    title: "Bienvenido",
    Error: "Usuario y/o contraseña incorrectos",
  });
});

router.post("/logout", sessionController.logout);


router.get(
  "/github",
  passport.authenticate("github", { scope: "user.email" }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "login" }),
  sessionController.githubCallback
);
module.exports = router;