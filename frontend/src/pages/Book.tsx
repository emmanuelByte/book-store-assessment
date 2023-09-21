/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Navbar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import BookType from "../types/Book";
import BookComponent from "../components/Book.component";
import { SuccessResponse, dataType, getBook, getBooks } from "../api/book.api";
import { addCartAPI } from "../api/user.api";
import { toast } from "react-toastify";

const BOOKS_PER_FETCH = 6 as const;

const Book = () => {
  // get book id from url
  const { id } = useParams();
  // get book from booksData
  const [book, setBook] = useState<dataType | undefined>();
  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }
      const res = (await getBook(id)) as SuccessResponse;
      const data = res.data as dataType;
      console.log(data);
      setBook(data);

      //
      const resb = (await getBooks()) as SuccessResponse;
      const bookData = resb.data as dataType[];

      setBooks(bookData);
    })();
  }, [id]);
  const [books, setBooks] = useState<dataType[]>([]);
  const [booksData, _] = useState<dataType[]>([]);
  const [booksLoaded, setBooksLoaded] = useState<number>(BOOKS_PER_FETCH);
  const hasMoreBooks = booksLoaded < books.length;

  const loadMoreBooks = () => {
    console.log("Loading more books...");
    setTimeout(() => {
      setBooksLoaded(booksLoaded + BOOKS_PER_FETCH);
    }, 1000);
  };
  const navigate = useNavigate();
  function handleBookClick(book: BookType) {
    navigate(`/book/${book._id}`);
  }
  useEffect(() => {
    const filteredBooks = booksData.filter(
      (bookI) =>
        bookI.category === book!.category && bookI.title !== book!.title
    );
    setBooks(filteredBooks);
    setBooksLoaded(BOOKS_PER_FETCH);
  }, [book, booksData]);
  async function addBookToCart() {
    const token = sessionStorage.getItem("token") as string;
    if (!token) {
      return toast.error("Please login to add book to cart");
    }
    const res = await addCartAPI({ token, bookId: id! });
    console.log(res);
    if (res.success) {
      toast.success("Book added to cart");
    } else {
      toast.error(res.message);
    }
  }
  return (
    <div>
      <Navbar />
      <main>
        <div className="max-w-full px-10">
          {book ? (
            <div>
              <div className="flex flex-col md:flex-row py-6 bg-white shadow rounded-lg mt-16">
                <div className="flex-shrink-0">
                  <img
                    className="h-full w-full object-cover md:w-64"
                    src={book.image}
                    alt={book.title}
                  />
                </div>
                <div className="mt-4 md:mt-0 flex flex-col justify-center ml-24">
                  <h1 className="text-xl font-bold text-gray-700">
                    {book.title}
                  </h1>
                  <h2 className="mt-2 text-md text-gray-600">
                    by {book.author}
                  </h2>
                  <div className="mt-4">
                    <p className="text-gray-700">{book.description}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-lg text-gray-700 font-bold">
                      Price: ${20}
                    </p>
                  </div>
                  <div className="mt-6">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                      onClick={addBookToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8">Similar Book</h2>
                {/* Let use grid instead */}
                <InfiniteScroll
                  dataLength={booksLoaded}
                  next={loadMoreBooks}
                  hasMore={hasMoreBooks}
                  loader={
                    <div className="flex justify-center items-center overflow-hidden">
                      <h3>Loading ...</h3>
                    </div>
                  }
                  className="grid grid-cols-6 gap-4 mt-4"
                >
                  {books.length ? (
                    books
                      .slice(0, booksLoaded)
                      .map((book) => (
                        <BookComponent
                          {...{ book, handleBookClick, key: book._id }}
                        />
                      ))
                  ) : (
                    <div className="flex justify-center items-center overflow-hidden">
                      <h3>No similar books found</h3>
                    </div>
                  )}
                </InfiniteScroll>
              </div>
            </div>
          ) : (
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Book not found
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Book;
