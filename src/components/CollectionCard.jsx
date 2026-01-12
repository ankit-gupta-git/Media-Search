import { useDispatch } from 'react-redux';
import { removeCollection, removeToast } from '../redux/features/collectionSlice';
import { motion } from 'framer-motion';
import { FiTrash2, FiExternalLink } from 'react-icons/fi';

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const removeFromCollection = (e) => {
        e.stopPropagation()
        dispatch(removeCollection(item.id))
        dispatch(removeToast())
    }

    const openInNewTab = (e) => {
        e.stopPropagation()
        window.open(item.url, '_blank')
    }

    return (
        <motion.div 
            className="group relative w-full h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 2xl:h-80 rounded-xl overflow-hidden 
                      bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Media Content */}
            <div className="relative w-full h-full">
                {item.type === 'photo' || item.type === 'gif' ? (
                    <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={item.src} 
                        alt={item.title}
                        loading="lazy"
                    />
                ) : (
                    <video 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        src={item.src}
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-white font-medium text-sm sm:text-base line-clamp-2">
                            {item.title}
                        </h3>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openInNewTab}
                            className="p-2 bg-gray-700/80 hover:bg-gray-600/90 rounded-full text-white transition-colors"
                            aria-label="View original"
                            title="View original"
                        >
                            <FiExternalLink className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={removeFromCollection}
                            className="p-2 bg-red-600/90 hover:bg-red-700 rounded-full text-white transition-colors"
                            aria-label="Remove from collection"
                            title="Remove from collection"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Action Bar (always visible) */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium text-sm line-clamp-1 pr-2">
                        {item.title}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={openInNewTab}
                            className="p-1.5 bg-gray-700/80 rounded-full text-white"
                            aria-label="View original"
                        >
                            <FiExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={removeFromCollection}
                            className="p-1.5 bg-red-600/90 rounded-full text-white"
                            aria-label="Remove"
                        >
                            <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CollectionCard