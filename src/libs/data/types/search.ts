export interface CartItem {
  _id: string;
  quantity?: number;
  name?: string;
  price?: number | undefined;
  image?: string;
}
