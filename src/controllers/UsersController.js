export class UsersController {
  
  logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).render("errors/error", { error: err });
      } else {
        res.redirect("/sessions/login");
        return res.send("Logout exitoso");
      }
    });
    res.redirect("/sessions/login");
  };

  localLogin = async (req, res) => {
    if (!req.user) return res.status(401).send("Invalid credentials");
    req.session.user = req.user;
    res.redirect("/api/products");
  };

  gitLogin = async (req, res) => {
    console.log("Callback: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/api/products");
  };

  googleLogin = async (req, res) => {
    console.log("Callback Google: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/api/products");
  };

  create = async (req, res) => {
    res.send("Se registro correctamente").redirect("/sessions/login");
  };
}
