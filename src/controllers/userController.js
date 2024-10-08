const UserManager = require("../dao/classes/user.dao.js");
const userService = new UserManager();

exports.getUsers = async (req, res) => {
  try {
    let users = await userService.getUsers();
    res.render("users", { users: users });
  } catch (error) {}
};
exports.getUser = async (req, res) => {
  let { uid } = req.params;
  try {
    let user = await userService.getUserById(uid);

    res.render("changeRol", { user: user });
  } catch (error) {}
};

exports.putRolUser = async (req, res) => {
  let { uid } = req.params;
  try {
    let user = await userService.getUserById(uid);
    if (user.rol === "premium") {
      const newRol = { rol: "user" };
      await userService.updateUserRol(user.email, newRol);

      return res
        .status(202)
        .json({ message: `Se cambio rol de usuario a ${newRol.rol}` });
    }
    if (user.rol === "user") {
      if (user.documents.length === 3) {
        const newRol = { rol: "premium" };
        await userService.updateUserRol(user.email, newRol);
        return res
          .status(202)
          .json({ message: `Se cambio rol de usuario a ${newRol.rol}` });
      } else {
        return res.status(202).json({ message: `Falta documentación` });
      }
    }

    res.redirect(`/premium/${uid}`);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ocurrió un error al procesar la solicitud" });
  }
};

exports.getDocuments = async (req, res) => {
  const { uid } = req.params;
  res.render("documents", {
    user: req.session.user,
    id: uid,
  });
};

exports.postDocuments = async (req, res) => {
  const { uid } = req.params;
  const idUser = { _id: uid };
  const documents = [];
  for (let fieldname in req.files) {
    req.files[fieldname].forEach((file) => {
      documents.push({
        name_document: fieldname,
        reference: file.filename,
      });
    });
  }
  await userService.postDocuments(idUser, documents);
  res.render("documents", {
    user: req.session.user,
    id: uid,
    message: "Documentación cargada correctamente",
  });
};