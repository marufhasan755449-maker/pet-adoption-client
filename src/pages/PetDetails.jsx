import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";
import { LoadingSpinner } from "../components/SharedComponents";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch(() => toast.error("Failed to load pet details."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pickupDate) {
      return toast.error("Please select a pickup date.");
    }
    setSubmitting(true);
    try {
      await axios.post(
        `${API}/adoptions`,
        {
          petId: id,
          petName: pet.name,
          userName: user.displayName,
          pickupDate: formData.pickupDate,
          message: formData.message,
        },
        { withCredentials: true }
      );
      toast.success("Adoption request submitted! 🐾");
      setShowForm(false);
      setFormData({ pickupDate: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!pet)
    return (
      <div className="text-center py-20 text-gray-500">Pet not found.</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="relative">
          <img
            src={pet.image || "https://placedog.net/600/400"}
            alt={pet.name}
            className="w-full h-full object-cover min-h-72"
          />
          {pet.adopted && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-2xl font-bold bg-green-500 px-6 py-2 rounded-full">
                ✅ Already Adopted
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
            <span className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full capitalize">
              {pet.species}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
            {[
              { label: "Breed", value: pet.breed },
              { label: "Age", value: pet.age },
              { label: "Gender", value: pet.gender },
              { label: "Location", value: pet.location },
              { label: "Health", value: pet.health },
              { label: "Vaccinated", value: pet.vaccine ? "Yes ✅" : "No ❌" },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="text-gray-400 text-xs uppercase">{label}</span>
                <p className="font-semibold text-gray-700">{value || "N/A"}</p>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold text-orange-500 mb-4">
            Adoption Fee: ৳{pet.fee || "Free"}
          </p>

          {pet.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {pet.description}
            </p>
          )}

          {!pet.adopted && user?.email !== pet.ownerEmail && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-lg"
            >
              🐱 {showForm ? "Close Form" : "Request Adoption"}
            </button>
          )}

          {pet.adopted && (
            <p className="text-center text-green-600 font-semibold">
              This pet has already been adopted. 🏡
            </p>
          )}
        </div>
      </div>

    
      {showForm && (
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 Adoption Request Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name
              </label>
              <input
                value={pet.name}
                readOnly
                className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Pickup Date *
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  setFormData({ ...formData, pickupDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message to Owner
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell the owner why you want to adopt this pet..."
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Request 🐾"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
