import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiImage, FiVideo, FiZap } from 'react-icons/fi'

const Tabs = () => {
  const tabs = [
    { 
      id: 'photos', 
      label: 'Photos',
      icon: <FiImage className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    { 
      id: 'videos', 
      label: 'Videos',
      icon: <FiVideo className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    { 
      id: 'gif', 
      label: 'GIFs',
      icon: <FiZap className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  ]
  
  const dispatch = useDispatch()
  const activeTab = useSelector(state => state.search.activeTab)

  return (
    <div className="flex flex-col items-center py-4 px-2 sm:px-0 font-sans">
      <div className="relative inline-flex items-center p-1 bg-gray-800 rounded-xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className={isActive ? 'text-blue-400' : ''}>
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-xs text-gray-400 font-sans"
        >
          Showing {activeTab === 'gif' ? 'GIFs' : activeTab}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Tabs
