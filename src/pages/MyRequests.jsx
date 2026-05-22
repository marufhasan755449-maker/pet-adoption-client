// ============================================================
// MyRequests.jsx
// ============================================================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/adoptions/my-requests`, { withCredentials: true })
      .then((res) => setRequests(res.data))
      .catch(() => toast.error("Failed to load requests."))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`${API}/adoptions/${id}`, { withCredentials: true });
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request cancelled.");
    } catch {
      toast.error("Failed to cancel.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 My Adoption Requests</h1>
      {requests.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-lg">You have not made any adoption requests yet.</p>
          <Link to="/all-pets" className="inline-block mt-4 text-orange-500 font-semibold hover:underline">
            Browse pets →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{req.petName}</h3>
                <p className="text-sm text-gray-500">
                  Requested: {new Date(req.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusColor[req.status]}`}>
                  {req.status}
                </span>
                {req.status === "pending" && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-4 py-1.5 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
