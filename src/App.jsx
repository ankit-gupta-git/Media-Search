import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/collection' element={<CollectionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App