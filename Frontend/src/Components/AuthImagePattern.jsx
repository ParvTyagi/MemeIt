"use client"
import * as motion from "motion/react-client"
import { useEffect, useState } from "react"

const AuthImagePattern = ({ title, subtitle }) => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const [swapCount, setSwapCount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prevOrder => {
        const newOrder = [...prevOrder]
        
        // Perform swaps based on current swapCount
        for (let i = 0; i < swapCount; i++) {
          const randomIndex1 = Math.floor(Math.random() * 9)
          const randomIndex2 = Math.floor(Math.random() * 9)
          
          // Swap elements
          const temp = newOrder[randomIndex1]
          newOrder[randomIndex1] = newOrder[randomIndex2]
          newOrder[randomIndex2] = temp
        }
        
        return newOrder
      })
      
      // Increment swapCount, reset to 1 after 9
      setSwapCount(prev => prev >= 9 ? 1 : prev + 1)
    }, 1500) // Change every 1.5 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8 w-72 h-72 mx-auto">
          {order.map((colorIndex, i) => (
            <motion.div
              key={colorIndex}
              layout
              transition={spring}
              className="aspect-square rounded-2xl"
              style={{
                backgroundColor: initialColors[colorIndex],
                opacity: 0.8,
              }}
              whileHover={{ 
                scale: 1.05,
                opacity: 1,
                transition: { duration: 0.2 }
              }}
            />
          ))}
        </div>
        <motion.h2 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-base-content/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

// Initial colors for the 9 squares
const initialColors = [
  "#ff0088", // Hot pink
  "#dd00ee", // Purple-pink
  "#9911ff", // Blue-purple
  "#0d63f8", // Blue
  "#00bfff", // Deep sky blue
  "#1e90ff", // Dodger blue
  "#ff6b6b", // Coral
  "#4ecdc4", // Turquoise
  "#45b7d1", // Light blue
]

/**
 * ==============   Styles   ================
 */
const spring = {
  type: "spring",
  damping: 25,
  stiffness: 200,
  duration: 1,
}