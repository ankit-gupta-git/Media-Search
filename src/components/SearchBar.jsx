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
    flex items-center justify-center
    px-4 sm:px-6 py-3 sm:py-4
    bg-gradient-to-r from-blue-500 to-purple-600
    text-white font-medium sm:font-semibold
    rounded-full
    -ml-2 sm:ml-0
    transition-all duration-300
    hover:shadow-lg hover:shadow-blue-500/30
    active:scale-95
    w-12 h-12 sm:w-auto sm:h-auto
    flex-shrink-0
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                    >
                        <span className="sr-only">Search</span>
                        <svg
                            className="w-5 h-5 sm:mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
