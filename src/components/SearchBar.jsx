import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(setQuery(text.trim()))
      setText('')
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <form onSubmit={submitHandler}>
        <div
          className={`
            flex items-center bg-gray-800 rounded-full overflow-hidden
            transition-all duration-200
            ${isFocused ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          {/* Left Icon */}
          <div className="pl-5 text-gray-400">
            <FiSearch className="w-5 h-5" />
          </div>

          {/* Input */}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for photos, videos, or GIFs..."
            className="
              flex-1 bg-transparent border-0
              py-4 pl-4 pr-4
              text-gray-100 placeholder-gray-400
              focus:outline-none focus:ring-0
              text-base sm:text-lg
            "
          />

          {/* Button */}
          <button
            type="submit"
            disabled={!text.trim()}
            className="
              flex items-center gap-2
              px-8 py-4
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold
              rounded-full
              -ml-2
              transition-all duration-300
              hover:shadow-lg hover:shadow-blue-500/30
              active:scale-95
              focus:outline-none focus:ring-0
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <FiSearch className="w-4 h-4" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
