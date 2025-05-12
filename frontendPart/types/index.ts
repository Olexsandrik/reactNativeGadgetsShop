import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode } from "react";

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};
export type PropsChildren = {
  children: ReactNode;
};

export type PropsLogin = NativeStackScreenProps<AuthStackParamList, "login">;
export type PropsRegister = NativeStackScreenProps<
  AuthStackParamList,
  "register"
>;
export type FormRegister = {
  name: string;
  email: string;
  password: string;
};

export type InputProps = {
  styles: any;
  name: string;
  control: any;
  placeholder?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

//Products&Categories
export type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  createdAt: string | Date;
  updatedAt: string | null;
};
export type AllCategories = {
  id: number;
  name: string;
  products: Products[];
};

export type AllProducts = {
  data: Products[];
};

export type MetaDate = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ProductsResponse = {
  data: Products[];
  meta: MetaDate;
};
export type CategoryResponse = {
  id: number;
  name: string;
  products: Products[] | null;
};
//

export type CardsType = {
  catalog: CategoryResponse | null;
  allProducts: Products[];
  theme: boolean;
  productLoading: boolean;
  fetchProducts: () => void;
};
