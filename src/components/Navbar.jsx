import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="py-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <Link 
          to='/' 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          MediaSearch
        </Link>
        
        <div className='flex gap-4 items-center'>
          <Link 
            to='/' 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive('/') 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Search
          </Link>
          
          <Link 
            to='/collection' 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive('/collection')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Collection
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar