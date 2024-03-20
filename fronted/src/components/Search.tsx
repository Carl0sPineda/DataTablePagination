const Search = () => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex items-center">
        <input
          placeholder="Buscar por nombre..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mr-2"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Buscar
        </button>
      </div>

      <div className="space-x-2">
        <button className="bg-gray-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
          Filtrar por Marca
        </button>
        <button className="bg-gray-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
          Filtrar por Año
        </button>
        <button className="bg-gray-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
          Filtrar por Año
        </button>
        <button className="bg-gray-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
          Filtrar por Año
        </button>
      </div>
    </div>
  );
};

export default Search;
