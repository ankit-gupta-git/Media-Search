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
        <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
            <form onSubmit={submitHandler} className="w-full">
                <div className="relative flex items-center">
                    <div className="absolute left-4 text-gray-400">
                        <FiSearch className="w-5 h-5" />
                    </div>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for photos, videos, or GIFs..."
                        className={`
                            w-full bg-gray-800 rounded-full
                            py-3 pl-12 pr-24 sm:pr-28
                            text-gray-100 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition-all duration-200
                            text-sm sm:text-base
                            ${isFocused ? 'ring-2 ring-blue-500' : ''}
                        `}
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className={`
                            absolute right-2 h-10 px-4 sm:px-5
                            bg-gradient-to-r from-blue-500 to-purple-600
                            text-white font-medium rounded-full
                            transition-all duration-200
                            hover:shadow-lg hover:shadow-blue-500/30
                            active:scale-95
                            disabled:opacity-60 disabled:cursor-not-allowed
                            flex items-center justify-center
                        `}
                    >
                        <span className="sm:hidden">
                            <svg
                                className="w-5 h-5"
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
                            <span className="sr-only">Search</span>
                        </span>
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
