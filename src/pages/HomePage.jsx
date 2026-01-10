import { useSelector } from 'react-redux'
import ResultGrid from '../components/ResultGrid'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery, setActiveTab } from '../redux/features/searchSlice'

const defaultSearches = {
  photos: ['nature', 'mountains', 'ocean', 'forest', 'animals'],
  videos: ['travel', 'adventure', 'wildlife', 'city', 'beach'],
  gifs: ['funny', 'cute', 'reaction', 'meme', 'happy']
}

const HomePage = () => {
  const { query, activeTab } = useSelector((store) => store.search)
  const dispatch = useDispatch()

  // Set a default search query when the component mounts
  useEffect(() => {
    if (!query) {
      const defaultCategory = defaultSearches[activeTab][Math.floor(Math.random() * 5)]
      dispatch(setQuery(defaultCategory))
    }
  }, [activeTab, dispatch, query])

  return (
    <div className="space-y-8">
      <SearchBar />
      
      {query ? (
        <>
          <Tabs />
          <ResultGrid />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Discover Amazing Content
          </h2>
          <p className="text-text-secondary mb-8">
            Start by searching or explore our popular categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {defaultSearches[activeTab].map((category) => (
              <button
                key={category}
                onClick={() => {
                  dispatch(setQuery(category))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-surface-hover rounded-full text-text-primary hover:bg-primary/10 hover:text-primary transition-colors capitalize"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage