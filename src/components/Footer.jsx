import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🐾</span>
            <span className="text-xl font-bold text-white">PawsHome</span>
          </div>
          <p className="text-sm leading-relaxed">
            Find your perfect companion. Give a loving home to a pet in need.
            Together we make tails wag! 🐶🐱
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
            <li>📧 support@pawshome.com</li>
            <li>📞 +880 1700-000000</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
          <div className="flex gap-3 mt-4 text-xl">
            <a href="#" className="hover:text-orange-400" aria-label="Facebook">🌐</a>
            <a href="#" className="hover:text-orange-400" aria-label="Twitter">🐦</a>
            <a href="#" className="hover:text-orange-400" aria-label="Instagram">📷</a>
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
