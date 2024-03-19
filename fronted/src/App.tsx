import { useState } from "react";
import { useGetUsers } from "./hooks/queries/product.queries";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: productData, isLoading, error } = useGetUsers(pageNumber);

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <>
      <h1 className="text-red-800 text-4xl text-center">Productos</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
          className={`${
            pageNumber === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900"
          } font-bold py-2 px-4 mr-2 rounded-l`}
        >
          Anterior
        </button>
        <span className="py-2 px-4 bg-gray-200">
          {pageNumber}/{productData?.totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber === productData?.totalPages}
          className={`${
            pageNumber === productData?.totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900"
          } font-bold py-2 px-4 ml-2 rounded-r`}
        >
          Siguiente
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {productData?.products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <p>Model Year: {product.model_year}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Color: {product.color}</p>
            <p>
              Availability:
              {product.availability ? "Available" : "Out of stock"}
            </p>
            <p>Created At: {product.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
