import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PetCard, LoadingSpinner } from "../components/SharedComponents";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const WhyAdopt = () => (
  <section className="py-16 bg-orange-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Why Adopt a Pet? 🐱
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "❤️", title: "Unconditional Love", desc: "Pets give you endless affection and companionship every single day." },
          { icon: "🏠", title: "Save a Life", desc: "Adopt and give a homeless animal a safe, warm forever home." },
          { icon: "😊", title: "Improve Well-being", desc: "Studies show pets reduce stress, anxiety, and increase happiness." },
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-5xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SuccessStories = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Success Stories 🌟
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Rahim & Max", story: "Max found his forever home after 3 months in the shelter. Now they go hiking every weekend!", img: "https://placedog.net/300/200?r=1" },
          { name: "Nadia & Luna", story: "Luna the cat completely changed Nadia's life. She says she cannot imagine a day without her.", img: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=300&h=200&fit=crop" },
          { name: "Karim & Buddy", story: "Buddy was found on the street. Today he is a certified therapy dog helping children!", img: "https://placedog.net/300/200?r=5" },
        ].map((s) => (
          <div key={s.name} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
            <img src={s.img} alt={s.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PetCareTips = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Pet Care Tips 🏥
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: "🥗", tip: "Balanced Diet", desc: "Feed your pet high-quality, species-appropriate food." },
          { icon: "🏃", tip: "Regular Exercise", desc: "Daily walks and play sessions keep pets healthy and happy." },
          { icon: "💉", tip: "Vaccinations", desc: "Stay up to date on all required vaccines and checkups." },
          { icon: "🛁", tip: "Grooming", desc: "Regular baths and grooming prevent infections and matting." },
        ].map((t) => (
          <div key={t.tip} className="bg-white p-5 rounded-2xl shadow text-center">
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{t.tip}</h3>
            <p className="text-sm text-gray-600">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VetSupport = () => (
  <section className="py-16 bg-green-50">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        24/7 Veterinary Support 🩺
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Our network of certified vets is always available to help with questions,
        emergencies, and routine health advice for your beloved pets.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {["100+ Vets", "24/7 Online", "Free Advice", "Home Visits"].map((s) => (
          <div key={s} className="bg-white p-4 rounded-xl shadow font-semibold text-green-700">
            ✅ {s}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HappyFamilies = () => (
  <section className="py-16 bg-purple-50">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Happy Families 👨‍👩‍👧‍👦
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { count: "5,000+", label: "Pets Adopted" },
          { count: "4,800+", label: "Happy Families" },
          { count: "200+", label: "Rescue Partners" },
          { count: "50+", label: "Cities Covered" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow">
            <div className="text-3xl font-extrabold text-purple-600">{stat.count}</div>
            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/pets/featured`)
      .then((res) => setFeaturedPets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      
      <section
        className="relative bg-gradient-to-br from-orange-400 to-orange-600 text-white py-28 px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-orange-900/60" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Find Your Perfect <br />
            <span className="text-yellow-300">Furry Friend 🐱</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-orange-100">
            Thousands of animals are waiting for a loving home. Adopt, don't
            shop — give them the family they deserve.
          </p>
          <Link
            to="/all-pets"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-full text-lg shadow-lg transition"
          >
            🐶 Adopt Now
          </Link>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Featured Pets 🐱
        </h2>
        {loading ? (
          <LoadingSpinner />
        ) : featuredPets.length === 0 ? (
          <p className="text-center text-gray-500">No pets available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/all-pets"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            See All Pets →
          </Link>
        </div>
      </section>

      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <VetSupport />
      <HappyFamilies />
    </div>
  );
};

export default Home;
