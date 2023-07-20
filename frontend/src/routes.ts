import Book from "./pages/Book";
import AddBook from "./pages/addBook";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

export default [
  {
    name: "Home",
    path: "/",
    component: Home,
  },

  {
    name: "Login",
    path: "/login",
    component: Login,
  },

  {
    name: "Register",
    path: "/register",
    component: Register,
  },
  //   dynamic route
  {
    name: "Book",
    path: "/book/:id",
    component: Book,
  },
  {
    name: "Cart",
    path: "/cart",
    component: Cart,
  },
  {
    name: "Add Book",
    path: "/addbook",
    component: AddBook,
  },
];
