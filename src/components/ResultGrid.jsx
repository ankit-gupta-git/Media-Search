import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/features/searchSlice'
import { useEffect, useState } from 'react'
import ResultCard from './ResultCard'
import { motion, AnimatePresence } from 'framer-motion'

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="relative rounded-xl overflow-hidden bg-gray-800 animate-pulse">
    <div className="pt-[100%] bg-gray-700" />
    <div className="absolute inset-0 p-4 flex flex-col justify-end">
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="flex justify-end gap-2 mt-2">
        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
      </div>
    </div>
  </div>
)

// Error State Component
const ErrorState = ({ message, onRetry }) => (
  <div className="w-full text-center py-16 px-4">
    <div className="max-w-md mx-auto">
      <div className="text-red-400 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-100 mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6">{message || 'Please try again later.'}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
)

// Empty State Component
const EmptyState = ({ query }) => (
  <div className="w-full text-center py-16 px-4">
    <div className="max-w-md mx-auto">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-gray-100 mb-2">No results found</h2>
      <p className="text-gray-400">
        We couldn't find any {query ? `results for "${query}"` : 'media'}. Try a different search term.
      </p>
    </div>
  </div>
)

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  )
  const [retryCount, setRetryCount] = useState(0)

  const fetchData = async () => {
    if (!query) {
      dispatch(setResults([]))
      return
    }

    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      let data = []

      if (activeTab === 'photos') {
        const res = await fetchPhotos(query)
        if (!res) return

        data = res.results.map(item => ({
          id: item.id,
          type: 'photo',
          title: item.alt_description || 'Untitled photo',
          thumbnail: item.urls?.small || item.urls?.regular,
          src: item.urls?.full || item.urls?.regular,
          url: item.links?.html || '#'
        }))
      }

      if (activeTab === 'videos') {
        const res = await fetchVideos(query)
        if (!res) return

        data = res.videos.map(item => ({
          id: item.id,
          type: 'video',
          title: item.user?.name || 'Untitled video',
          thumbnail: item.image || item.video_pictures?.[0]?.picture,
          src: item.video_files?.[0]?.link || item.video_files?.[0]?.file,
          url: item.url || item.video_files?.[0]?.link || '#'
        }))
      }

      if (activeTab === 'gif') {
        const res = await fetchGifs(query)
        if (!res) return

        data = res.data.map(item => ({
          id: item.id,
          type: 'gif',
          title: item.title || 'GIF',
          thumbnail: item.images?.fixed_width_small?.url || item.images?.downsized_medium?.url,
          src: item.images?.original?.url || item.images?.downsized_large?.url,
          url: item.url || item.bitly_url || '#'
        }))
      }

      dispatch(setResults(data))
    } catch (err) {
      console.error('Error fetching media:', err)
      dispatch(setError(err.message || 'Failed to fetch media. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 300) // Small debounce to prevent rapid API calls

    return () => clearTimeout(timer)
  }, [query, activeTab, retryCount]) // Added retryCount to dependencies

  // Handle retry
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4 md:p-6">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  // Show error state
  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />
  }

  // Show empty state
  if (!loading && results.length === 0 && query) {
    return <EmptyState query={query} />
  }

  // Show results
  return (
    <AnimatePresence>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4 md:p-6">
        {results.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="w-full"
          >
            <ResultCard item={item} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}

export default ResultGrid
