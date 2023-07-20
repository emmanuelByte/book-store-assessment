/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import Navbar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { addBookAPI } from "../api/book.api";
import { toast } from "react-toastify";

const AddBook = () => {
  const [user, setUser] = React.useState({
    title: "",
    category: "",
    description: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token") as string;
    if (!token) {
      toast.error("Please login first");
    }
    const res = await addBookAPI({ ...user, token });
    if (!res.success) {
      return toast.error(res.message);
    }
    toast.success("Book added successfully");
    navigate("/");
  };
  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center  w-full">
        <div className="mt-6 w-[50%] h-4/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="flex text-sm font-medium text-gray-700 "
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>{" "}
            <div>
              <label
                htmlFor="category"
                className="flex text-sm font-medium text-gray-700 "
              >
                category
              </label>
              <div className="mt-1">
                <input
                  id="category"
                  name="category"
                  type="category"
                  onChange={handleChange}
                  autoComplete="category"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="flex text-sm font-medium text-gray-700 "
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  id="description"
                  name="description"
                  type="description"
                  onChange={handleChange}
                  autoComplete="description"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="author"
                className="flex text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <div className="mt-1">
                <input
                  id="author"
                  name="author"
                  onChange={handleChange}
                  type="author"
                  autoComplete="current-author"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBook;
