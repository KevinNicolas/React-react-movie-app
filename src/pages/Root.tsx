import '../css/root.css'
import { FiTriangle, FiSearch } from 'react-icons/fi'

export function Root () {

  return (
    <div className="root-container">
      {/* Main view */}
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-black bg-opacity-30 flex flex-row justify-center items-center h-48 w-screen">
          <div>
            <span className="text-blue-400 text-9xl">
              <FiTriangle />
            </span>
          </div>
          <div className="pb-3 flex flex-row items-end">
            <span className="text-gray-200 text-7xl font-medium">React-movies</span>
          </div>
        </div>
      </div>
    </div>
  )
}