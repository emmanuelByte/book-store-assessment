/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import BookType from "../types/Book";
import BookComponent from "../components/Book.component";
import { SuccessResponse, dataType, getBooks } from "../api/book.api";
const BOOKS_PER_FETCH = 6 as const;

const Home = () => {
  const categories = [
    {
      category: "Fiction",
      icon: "📖",
    },
    {
      category: "Biography",
      icon: "📚",
    },
    {
      category: "Business & Finance",
      icon: "💼",
    },
    {
      category: "Children's Books",
      icon: "🧸",
    },
    {
      category: "Computing",
      icon: "💻",
    },
    {
      category: "Cooking",
      icon: "🍳",
    },
    {
      category: "Education",
      icon: "🎓",
    },
    {
      category: "Health & Fitness",
      icon: "🏋️",
    },
    {
      category: "History",
      icon: "⏳",
    },
    {
      category: "Horror",
      icon: "👻",
    },
    {
      category: "Mystery & Crime",
      icon: "🕵️",
    },
    {
      category: "Romance",
      icon: "💖",
    },
    {
      category: "Science Fiction & Fantasy",
      icon: "🚀",
    },
    {
      category: "Self Help",
      icon: "💡",
    },
    {
      category: "Sports",
      icon: "⚽",
    },
    {
      category: "Travel",
      icon: "🌍",
    },
  ];
  const [booksData, setBooksData] = useState<dataType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access

  const [books, setBooks] = useState(booksData);
  useEffect(() => {
    (async () => {
      const res = (await getBooks()) as SuccessResponse;
      const data = res.data as dataType[];

      setBooksData(data);
      setBooks(data);
      setNewReleases(data.slice(0, 6));
    })();
  }, []);
  const [booksLoaded, setBooksLoaded] = useState<number>(BOOKS_PER_FETCH);
  const [newReleases, setNewReleases] = useState(books.slice(0, 6)); //
  const [selectedCategory, setSelectedCategory] = useState<string>("" as const);
  // Determine if there are more books to load
  const navigate = useNavigate();
  const hasMoreBooks = booksLoaded < books.length;
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    const filteredBooks = booksData.filter(
      (book) => book.category === category
    );
    setBooks(filteredBooks);
    setBooksLoaded(BOOKS_PER_FETCH);
    setNewReleases(filteredBooks.slice(0, 6));
  };
  const loadMoreBooks = () => {
    setTimeout(() => {
      setBooksLoaded(booksLoaded + BOOKS_PER_FETCH);
    }, 1000);
  };
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;

    const filteredBooks = booksData.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBooks(filteredBooks);
    setBooksLoaded(BOOKS_PER_FETCH);
    setNewReleases(filteredBooks.slice(0, 12));
  }
  function handleBookClick(book: BookType) {
    navigate(`/book/${book._id}`);
  }
  function removeCategory() {
    console.log("Removing category: ", selectedCategory);
    setSelectedCategory("");
    setBooks(booksData);
    setBooksLoaded(BOOKS_PER_FETCH);
    setNewReleases(booksData.slice(0, 6));
  }

  return (
    <div className="min-h-screen">
      <Navbar
        {...{
          handleSearch,
        }}
      />
      <main className="px-12 mt-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Book Categories</h2>
          <div className="flex flex-wrap justify-start items-center">
            {categories.map((category) => (
              <div
                key={category.category}
                onClick={() => filterByCategory(category.category)}
                className={classNames(
                  "flex flex-col items-center justify-center  m-4 bg-white cursor-pointer hover:shadow-lg rounded-xl p-2",
                  {
                    "border-2 border-blue-950 shadow-lg":
                      selectedCategory === category.category,
                  }
                )}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-bold">{category.category}</span>
              </div>
            ))}
          </div>
          {/* Show category picked */}
          {selectedCategory && (
            <div className="flex items-center justify-center">
              <p className="text-lg font-bold flex items-center">
                Showing books in category:{" "}
                <span className="text-blue-950">{selectedCategory}</span>
                <button onClick={removeCategory} className="text-blue-950 ml-1">
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </p>
            </div>
          )}
        </div>
        {newReleases.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mt-8">New Releases</h2>
            {/* Let use grid instead */}
            <div className="grid grid-cols-6 gap-4 mt-4">
              {newReleases.map((book) => (
                <BookComponent {...{ book, handleBookClick, key: book._id }} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mt-8">All Books</h2>
          {/* Let use grid instead */}
          <InfiniteScroll
            dataLength={booksLoaded}
            next={loadMoreBooks}
            hasMore={hasMoreBooks}
            loader={<h4>Loading...</h4>}
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
            className="grid grid-cols-6 gap-4 mt-4"
          >
            {books.slice(0, booksLoaded).map((book) => (
              <BookComponent {...{ book, handleBookClick, key: book._id }} />
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
};

export default Home;
