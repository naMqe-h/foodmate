import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">FoodMate</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/recipes" className="text-gray-600 hover:text-orange-600 transition-colors">
              Recipes
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-orange-600 transition-colors">
              Categories
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-orange-600 transition-colors">
              Search
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login"
              className="px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
