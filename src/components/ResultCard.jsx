import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'
import { FiSave, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCollection = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addCollection(item))
        dispatch(addedToast())
    }

    const mediaContent = {
        photo: <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={item.thumbnail} 
            alt={item.title} 
            loading="lazy"
        />,
        video: <video 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            autoPlay 
            loop 
            muted 
            playsInline
            src={item.src}
        />,
        gif: <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={item.src} 
            alt={item.title}
            loading="lazy"
        />
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
        >
            <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative pt-[100%] bg-gray-900"
            >
                <div className="absolute inset-0">
                    {mediaContent[item.type]}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-white font-medium text-sm truncate">
                            {item.title}
                        </h3>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => addToCollection(e, item)}
                                className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                                aria-label="Save to collection"
                                title="Save to collection"
                            >
                                <FiSave className="w-4 h-4" />
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
                                aria-label="View original"
                                title="View original"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FiExternalLink className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    )
}

export default ResultCard