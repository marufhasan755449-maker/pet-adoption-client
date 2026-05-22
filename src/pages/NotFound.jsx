import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4 animate-bounce">🐾</div>
      <h1 className="text-8xl font-extrabold text-orange-400 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        Looks like this page ran away just like a curious cat! The page you are
        looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
