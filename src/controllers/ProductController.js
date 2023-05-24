import { ProductRepository } from "../repository/productsRepository.js";


//TODO: Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.

export class ProductController {
  constructor() {
    this.productRepository = new ProductRepository()
  }

  getFiltered = async (req, res) => {
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

    const products = await this.productRepository.getFiltered(filter, page, limit, sort);
    res.status(200).json(products);
  };

  getById = async (req, res) => {
    //TODO: validar id numerico
    const pid = req.params.pid;
    const product = await this.productRepository.getById(pid);
    res.status(200).json(product);
  };

  deleteById = async (req, res) => {
    const pid = req.params.pid;
    await this.productRepository.deleteById(pid);
    res.status(200).send("Producto borrado");
  };

  create = async (req, res) => {
    const product = await this.productRepository.create(req.body);
    res.status(200).json(product);
  };
}