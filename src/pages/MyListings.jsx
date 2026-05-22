import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteModal } from "../components/SharedComponents";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Requests Modal ────────────────────────────────────────
const RequestsModal = ({ petId, petName, onClose }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/adoptions/pet/${petId}`, { withCredentials: true })
      .then((res) => setRequests(res.data))
      .catch(() => toast.error("Failed to load requests."))
      .finally(() => setLoading(false));
  }, [petId]);

  const handleApprove = async (reqId) => {
    try {
      await axios.patch(`${API}/adoptions/${reqId}/approve`, {}, { withCredentials: true });
      toast.success("Request approved! 🎉");
      // Refresh
      const res = await axios.get(`${API}/adoptions/pet/${petId}`, { withCredentials: true });
      setRequests(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve.");
    }
  };

  const handleReject = async (reqId) => {
    try {
      await axios.patch(`${API}/adoptions/${reqId}/reject`, {}, { withCredentials: true });
      toast.success("Request rejected.");
      setRequests((prev) =>
        prev.map((r) => (r._id === reqId ? { ...r, status: "rejected" } : r))
      );
    } catch {
      toast.error("Failed to reject.");
    }
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            📋 Requests for <span className="text-orange-500">{petName}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : requests.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No requests yet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{req.userName}</p>
                      <p className="text-sm text-gray-500">{req.userEmail}</p>
                      <p className="text-sm text-gray-500">
                        Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusColor[req.status]}`}>
                      {req.status}
                    </span>
                  </div>
                  {req.message && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg mb-3">
                      "{req.message}"
                    </p>
                  )}
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg transition"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-lg transition"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── My Listings Page ──────────────────────────────────────
const MyListings = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null); // for requests modal
  const [deleteTarget, setDeleteTarget] = useState(null); // for delete modal

  useEffect(() => {
    axios
      .get(`${API}/pets/my-listings`, { withCredentials: true })
      .then((res) => setPets(res.data))
      .catch(() => toast.error("Failed to load listings."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/pets/${deleteTarget._id}`, { withCredentials: true });
      setPets((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      toast.success("Pet deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const total = pets.length;
  const available = pets.filter((p) => !p.adopted).length;
  const adopted = pets.filter((p) => p.adopted).length;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🏠 My Listings</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Listings", value: total, color: "text-blue-600 bg-blue-50" },
          { label: "Available", value: available, color: "text-orange-600 bg-orange-50" },
          { label: "Adopted", value: adopted, color: "text-green-600 bg-green-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 text-center shadow ${s.color}`}>
            <div className="text-3xl font-extrabold">{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add Pet Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/add-pet"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
        >
          + Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-gray-500 text-lg">You have not listed any pets yet.</p>
          <Link to="/add-pet" className="inline-block mt-4 text-orange-500 font-semibold hover:underline">
            Add your first pet →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative">
                <img src={pet.image || "https://placedog.net/400/250"} alt={pet.name} className="w-full h-44 object-cover" />
                {pet.adopted && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    Adopted ✓
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{pet.breed} · {pet.species}</p>
                <p className="text-orange-500 font-semibold mb-3">৳{pet.fee || "Free"}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="flex-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 py-1.5 rounded-lg font-semibold transition"
                  >
                    Requests
                  </button>
                  <Link
                    to={`/edit-pet/${pet._id}`}
                    className="flex-1 text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 py-1.5 rounded-lg font-semibold text-center transition"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/pets/${pet._id}`}
                    className="flex-1 text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 py-1.5 rounded-lg font-semibold text-center transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(pet)}
                    className="flex-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 py-1.5 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedPet && (
        <RequestsModal
          petId={selectedPet._id}
          petName={selectedPet.name}
          onClose={() => setSelectedPet(null)}
        />
      )}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        petName={deleteTarget?.name}
      />
    </div>
  );
};

export default MyListings;
