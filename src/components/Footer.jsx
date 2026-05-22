import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link to="/" className="flex items-center gap-2">
  <img
    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=40&h=40&fit=crop"
    alt="logo"
    className="w-9 h-9 rounded-full object-cover border-2 border-orange-400"
  />
  <span className="text-xl font-bold">PawsHome</span>
</Link>
          </div>
          <p className="text-sm leading-relaxed">
            Find your perfect companion. Give a loving home to a pet in need.
            Together we make tails wag!🐱
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/all-pets" className="hover:text-orange-400 transition">All Pets</Link></li>
            <li><Link to="/add-pet" className="hover:text-orange-400 transition">Add Pet</Link></li>
            <li><Link to="/my-listings" className="hover:text-orange-400 transition">My Listings</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📩 marufhasan45@gmail.com </li>
            <li>📞 +880 1613857057</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
          <div className="flex gap-3 mt-3">
  {/* Facebook */}
  <a href="#" className="text-gray-400 hover:text-blue-500 transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  </a>
  {/* Twitter/X */}
  <a href="#" className="text-gray-400 hover:text-sky-400 transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.844l4.262 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  {/* Instagram */}
  <a href="#" className="text-gray-400 hover:text-pink-500 transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </a>
</div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PawsHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
