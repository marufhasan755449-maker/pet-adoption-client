import { useEffect, useState } from "react";
import axios from "axios";
import { PetCard, LoadingSpinner } from "../components/SharedComponents";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SPECIES = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Other"];

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [sort, setSort] = useState("");

  const fetchPets = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (selectedSpecies.length) params.species = selectedSpecies.join(",");
    if (sort) params.sort = sort;

    axios
      .get(`${API}/pets`, { params })
      .then((res) => setPets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedSpecies, sort]);

  const toggleSpecies = (s) => {
    setSelectedSpecies((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🐾 All Available Pets
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        {/* Species Filter */}
        <div className="flex flex-wrap gap-2">
          {SPECIES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSpecies(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                selectedSpecies.includes(s)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "text-gray-600 border-gray-300 hover:border-orange-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 ml-auto"
        >
          <option value="">Sort by</option>
          <option value="name_asc">Name A-Z</option>
          <option value="fee_asc">Fee: Low to High</option>
          <option value="fee_desc">Fee: High to Low</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : pets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{pets.length} pets found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPets;
