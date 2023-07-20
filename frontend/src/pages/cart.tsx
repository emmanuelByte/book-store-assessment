/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import BookType from "../types/Book";
import BookComponent from "../components/Book.component";
import { SuccessResponse, dataType, getBooks } from "../api/book.api";
import { getCartAPI } from "../api/user.api";
const BOOKS_PER_FETCH = 12 as const;

const Cart = () => {
  const [booksData, setBooksData] = useState<dataType[]>([]);
  const [carts, setCarts] = useState<dataType[]>([]);
  const [books, setBooks] = useState(booksData);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }
      const res = (await getBooks()) as SuccessResponse;
      const resd = (await getCartAPI({ token })) as SuccessResponse;
      const bookData = res.data as dataType[];
      const data = resd.data as unknown as { books: dataType[] };
      const datac = data.books;
      setBooksData(bookData);
      setBooks(bookData);
      setCarts(datac);
    })();
  }, [navigate]);
  const [booksLoaded, setBooksLoaded] = useState<number>(BOOKS_PER_FETCH);
  const hasMoreBooks = booksLoaded < books.length;
  const loadMoreBooks = () => {
    console.log("Loading more books...");
    setTimeout(() => {
      setBooksLoaded(booksLoaded + BOOKS_PER_FETCH);
    }, 1000);
  };
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    console.log("Searching for: ", searchQuery);
    const filteredBooks = booksData.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBooks(filteredBooks);
    setBooksLoaded(BOOKS_PER_FETCH);
  }
  function handleBookClick(book: BookType) {
    navigate(`/book/${book._id}`);
  }

  return (
    <div className="min-h-screen">
      <Navbar
        {...{
          handleSearch,
        }}
      />
      <main className="px-12 mt-8">
        <h2 className="text-2xl font-bold mt-8">My Cart</h2>
        {/* Let use grid instead */}
        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mt-8">Your cart is empty</h2>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4 mt-4">
            {carts.map((book) => (
              <BookComponent {...{ book, handleBookClick, key: book._id }} />
            ))}
          </div>
        )}
      </main>
      <main className="px-12 mt-8">
        <h2 className="text-2xl font-bold mt-8">All Books</h2>
        {/* Let use grid instead */}
        <InfiniteScroll
          dataLength={booksLoaded}
          next={loadMoreBooks}
          hasMore={hasMoreBooks}
          loader={<h4>Loading...</h4>}
          className="grid grid-cols-6 gap-4 mt-4"
        >
          {books.slice(0, booksLoaded).map((book) => (
            <BookComponent {...{ book, handleBookClick, key: book._id }} />
          ))}
        </InfiniteScroll>
      </main>
    </div>
  );
};

export default Cart;
