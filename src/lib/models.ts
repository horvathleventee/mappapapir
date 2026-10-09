export type ArtKind =
  | "notebook"
  | "pen"
  | "pencils"
  | "paper"
  | "folder"
  | "clips"
  | "ruler"
  | "bag"
  | "paint"
  | "tape"
  | "scissors"
  | "organizer";
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  details: string[];
  tags: string[];
  art: ArtKind;
  color: string;
  variants?: string[];
  featured?: boolean;
}
export interface CartItem {
  productId: string;
  variant: string;
  quantity: number;
}
export type SortOrder = "featured" | "price-asc" | "price-desc" | "name";
export interface CatalogFilters {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOrder;
}
