import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'
import toast, { Toaster } from 'react-hot-toast'

const CollectionPage = () => {
  const collection = useSelector(state => state.collection.items)
  const dispatch = useDispatch()

  const clearAll = () => {
    dispatch(clearCollection())
    toast.success('Collection cleared!', {
      position: 'bottom-center',
      duration: 2000,
      style: {
        background: '#1f2937',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        maxWidth: '90%',
        margin: '0 auto 1rem'
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-6 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Toaster />
        
        {collection.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Your Collection
                <span className="text-gray-400 text-sm sm:text-base font-normal ml-2">
                  ({collection.length} {collection.length === 1 ? 'item' : 'items'})
                </span>
              </h2>
              <button 
                onClick={clearAll} 
                className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg 
                          transition-all duration-200 active:scale-95 text-sm sm:text-base
                          flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {collection.map((item, idx) => (
                <div key={idx} className="w-full">
                  <CollectionCard item={item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4 text-center">
            <div className="bg-gray-800 p-6 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Collection is Empty</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Save your favorite media items to see them here. Start by searching and clicking the save button.
            </p>
            <a 
              href="/" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                        transition-all duration-200 active:scale-95 inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Start Searching
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionPage