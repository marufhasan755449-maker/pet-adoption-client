import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SPECIES_OPTIONS = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Other"];
const HEALTH_OPTIONS = ["Excellent", "Good", "Fair", "Needs Attention"];

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    image: "",
    health: "Good",
    vaccine: false,
    location: "",
    fee: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API}/pets`,
        { ...form, ownerEmail: user.email, fee: Number(form.fee) || 0 },
        { withCredentials: true }
      );
      toast.success("Pet listed successfully! 🐾");
      navigate("/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add pet.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          🐾 Add a Pet for Adoption
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Help a pet find a loving home by listing them here.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row: Name + Species */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Max" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
              <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
                {SPECIES_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Row: Breed + Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
              <input name="breed" value={form.breed} onChange={handleChange} placeholder="e.g. Labrador" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 2 years" className={inputClass} />
            </div>
          </div>

          {/* Row: Gender + Health */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
              <select name="health" value={form.health} onChange={handleChange} className={inputClass}>
                {HEALTH_OPTIONS.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input name="image" value={form.image} onChange={handleChange} required placeholder="https://..." className={inputClass} />
            {form.image && (
              <img src={form.image} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl" onError={(e) => (e.target.style.display = "none")} />
            )}
          </div>

          {/* Row: Location + Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Dhaka" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee (৳)</label>
              <input type="number" name="fee" value={form.fee} onChange={handleChange} placeholder="0 for free" min="0" className={inputClass} />
            </div>
          </div>

          {/* Vaccination Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="vaccine" checked={form.vaccine} onChange={handleChange} className="w-5 h-5 accent-orange-500" />
            <span className="text-sm font-medium text-gray-700">Vaccinated ✅</span>
          </label>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tell people about this pet's personality, habits, and needs..." className={`${inputClass} resize-none`} />
          </div>

          {/* Owner Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
            <input value={user?.email || ""} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-lg disabled:opacity-50"
          >
            {loading ? "Adding Pet..." : "🐾 Add Pet for Adoption"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
