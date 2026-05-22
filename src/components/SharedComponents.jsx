// ── PetCard ──────────────────────────────────────────────
import { Link } from "react-router-dom";

export const PetCard = ({ pet }) => {
  const { _id, name, breed, species, image, fee, adopted } = pet;
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden h-52">
        <img
          src={image || "https://placedog.net/400/300"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {adopted && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Adopted ✓
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full capitalize">
            {species}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-1">🐾 {breed}</p>
        <p className="text-sm font-semibold text-orange-500 mb-3">
          Fee: ৳{fee || "Free"}
        </p>
        <Link
          to={`/pets/${_id}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-sm font-semibold transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// ── LoadingSpinner ────────────────────────────────────────
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <div className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── DeleteModal ───────────────────────────────────────────
export const DeleteModal = ({ isOpen, onClose, onConfirm, petName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <div className="text-5xl mb-3">🗑️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Pet</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-orange-500">{petName}</span>? This
            action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
