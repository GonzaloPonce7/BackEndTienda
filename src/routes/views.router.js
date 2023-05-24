import express from "express";
import { CartRepository } from "../repository/cartRepository.js";
import { validateRoles } from "../middleware/validateUsers.js";
import { ProductRepository } from "../repository/productsRepository.js";
import { UsersRepository } from "../repository/usersRepository.js";
import { TicketRepository } from "../repository/ticketRepository.js";
import passport from "passport";

const router = express.Router();
const cartRepository = new CartRepository();
const usersRepository = new UsersRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();


async function filterProducts(req) {

  let page = req?.query?.page || req?.body?.page;
  let limit = req?.query?.limit || req?.body?.limit;
  let sort = req?.query?.sort || req?.body?.sort;

  let filter = {};

  if (req?.query?.title) filter.title = req.query.title;
  if (req?.query?.description) filter.description = req.query.description;
  if (req?.query?.price) filter.price = req.query.price;
  if (req?.query?.stock) filter.stock = req.query.stock;
  if (req?.query?.code) filter.code = req.query.code;
  if (req?.query?.status) filter.status = req.query.status;
  if (req?.query?.category) filter.category = req.query.category;

  // result.prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : ''
  // result.nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : ''
  // result.isValid = !(page <= 0 || page>result.totalPages)

  return await productRepository.getFiltered(filter, page, limit, sort);
}

// Vista de login
router.get("/login", async (req, res) => {
  res.render("sessions/login", {});
});

// Vista para registrar usuarios
router.get("/register", async (req, res) => {
  res.render("sessions/register", {});
});

//Vista para fail log
router.get("/faillogin", async (req, res) => {
  res.render("sessions/faillogin");
});

//Vista para listar users (admin)
router.get("/users_admin", validateRoles(["admin"]), async (req, res) => {
  const users = await usersRepository.getAll()
  res.render("admin/users_admin", {users});
});

//Vista par el fail register
router.get('/failregister', async(req, res) => {
    console.error('Failed Stragtregy');
    res.render('sessions/failregister')
})

router.get(
  "/login_google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  async (req, res) => {
    res.render("sessions/login", {});
  }
);

router.get(
  "/login_github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.render("sessions/login", {});
  }
);

router.get("/", async (req, res) => {
  const products = await filterProducts(req);
  const user = req.session.user;

  const homeContext = { products, user};

  res.render("home", homeContext);
});

router.get("/products", validateRoles(["admin"]), async (req, res) => {
  const products = await filterProducts(req);
  const user = req.session.user;

  const context = { products, user };

  res.render("admin/products_admin", context);
});

router.get("/cart", async (req, res) => {

  let cart = null
  let products = []
  let errorMsg = null
  const user = req.session.user

  if(user) {
    const cartId = user?.cartId
    cart = await cartRepository.getById(cartId)
  }

  for (const p of cart.products) {
    const productFinded = await productRepository.getById(p.productId)
    let product = {
      title: productFinded.title,
      price: productFinded.price,
      quantity: p.quantity
    }
    products.push(product)
  }

  const cartContext = { cart, products, errorMsg }

  res.render("cart", cartContext);
});


router.get("/ticket/:tid", validateRoles(["user"]), async (req, res) => {
  const tid = req.params.tid
  const ticket = await ticketRepository.getById(tid)
  console.log("Aca llega el ticket buscado " + ticket);
  console.log("Esta es el tipo  " + typeof ticket);
  const ticketContext = { ticket }

  res.render("ticket", ticketContext);
})

export { router as viewsRouter };