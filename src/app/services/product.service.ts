import axios from "axios";
import { serverURL } from "../../libs/configs";
import type { Product, ProductInquiry } from "../../libs/data/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public getProducts = async (input: ProductInquiry): Promise<Product[]> => {
    let url = `${this.path}/product/products?order=${input.order}&page=${input.page}&limit=${input.limit}`;
    if (input.productCollection) {
      url += `&productCollection=${input.productCollection}`;
    }
    if (input.search) {
      url += `&search=${input.search}`;
    }
    const result = await axios.get(url);
    console.log("Product service, [getProducts] result: ", result.data);
    return result.data;
  };

  public getAllProducts = async (): Promise<Product[]> => {
    const url = this.path + "/product/all-products";
    const result = await axios.get(url, { withCredentials: true });
    return result.data;
  };
}

export default ProductService;
