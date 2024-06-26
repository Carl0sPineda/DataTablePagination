import { ChangeEvent, useState } from "react";
import { useGetAllsProducts } from "../hooks/queries/product.queries";
import { useDebounce } from "use-debounce";

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const [debouncedNameSearch] = useDebounce(nameSearch, 300);
  const { data: productData } = useGetAllsProducts(
    pageNumber,
    debouncedNameSearch
  );

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameSearch(event.target.value);
    setPageNumber(1);
  };

  return (
    <div className="mt-8 mx-4">
      <h1 className="text-center mb-5 text-3xl">
        Tabla de productos paginación
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={nameSearch}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {/* Table Header */}
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            {/* Table Header Columns */}
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Año del Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Disponibilidad
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Mapping through product data to populate table rows */}
            {productData?.products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td
                  scope="row"
                  className="flex items-center px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.name}
                </td>
                <td className="px-6 py-3">${product.price}</td>
                <td className="px-6 py-3">{product.brand}</td>
                <td className="px-10 py-3">{product.model_year}</td>
                <td className="px-10 py-3">{product.quantity}</td>
                <td className="px-7 py-3">{product.color}</td>
                <td className="px-10 py-3">
                  {product.availability ? "Disponible" : "Agotado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination Buttons */}
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
    </div>
  );
};

export default Products;
