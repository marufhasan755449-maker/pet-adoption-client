import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/SharedComponents";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SPECIES_OPTIONS = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Other"];
const HEALTH_OPTIONS = ["Excellent", "Good", "Fair", "Needs Attention"];

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/pets/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to load pet."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.patch(`${API}/pets/${id}`, form, { withCredentials: true });
      toast.success("Pet updated successfully! ✅");
      navigate("/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">✏️ Edit Pet</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
              <input name="name" value={form.name || ""} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
              <select name="species" value={form.species || "Dog"} onChange={handleChange} className={inputClass}>
                {SPECIES_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
              <input name="breed" value={form.breed || ""} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input name="age" value={form.age || ""} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={form.gender || "Male"} onChange={handleChange} className={inputClass}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
              <select name="health" value={form.health || "Good"} onChange={handleChange} className={inputClass}>
                {HEALTH_OPTIONS.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" value={form.image || ""} onChange={handleChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location || ""} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee (৳)</label>
              <input type="number" name="fee" value={form.fee || ""} onChange={handleChange} min="0" className={inputClass} />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="vaccine" checked={!!form.vaccine} onChange={handleChange} className="w-5 h-5 accent-orange-500" />
            <span className="text-sm font-medium text-gray-700">Vaccinated ✅</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description || ""} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <button type="submit" disabled={saving} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-lg disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes ✅"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPet;
