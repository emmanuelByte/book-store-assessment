import BookType from "../types/Book";

const BookComponent = ({
  book,
  handleBookClick,
}: {
  book: BookType;
  handleBookClick: (book: BookType) => void;
}) => {
  return (
    <div
      key={book.title}
      onClick={() => handleBookClick(book)}
      className="flex flex-col items-center justify-center bg-white cursor-pointer hover:shadow-lg rounded-xl p-2"
    >
      <img
        className="w-full "
        src={
          book.image ||
          "https://cdn.asaha.com/assets/thumbs/9b8/9b88b7c17f496a61fc78505130af288e.jpg"
        }
        alt={book.title}
      />
      <div className="mt-2 space-y-2">
        <p className="text-sm font-bold">{book.title}</p>
        <p className="text-sm">{book.description}</p>
      </div>
    </div>
  );
};

export default BookComponent;
