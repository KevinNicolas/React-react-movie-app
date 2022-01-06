import { useState, createRef, RefObject, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react'

import { FiSearch, FiLoader } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import debounce from 'lodash.debounce'

import useQuery from '../hooks/query'

import '../css/general.css'


const SearchBar = forwardRef ((props, ref) => {

  const [searchIsLoading, setSearchIsLoading] = useState(false)
  const textInput: RefObject<HTMLInputElement> = createRef<HTMLInputElement>()
  const navigate = useNavigate()
  const searchQuery: string | null = useQuery().get('search')

  function SearchMovie (event: any) {
    setSearchIsLoading(true)
    navigate(`/?search=${event.target.value}`)
  }
  
  const debouncedChangeHandler = useMemo(() => debounce(SearchMovie, 900), [])
  
  useEffect(() => {
    if (textInput.current) { textInput.current.value = searchQuery ?? '' }
  }, [searchQuery])
  
  useImperativeHandle(ref, () => ({
    setSearchIsLoading
  }))

  return (
    <div className='bg-blue-400 pl-3 flex flex-row center gap-3 rounded-md text-white'>
        {
          searchIsLoading
          ? <FiLoader className='spin-fade-in' size={28} />
          : <FiSearch className='fade-in' size={28} />
        }
      <input
        ref={textInput}
        type="text"
        placeholder='Buscar...'
        className='text-black px-2 py-3 outline-none full'
        onChange={debouncedChangeHandler}
      />
    </div>
  )
})

export default SearchBar