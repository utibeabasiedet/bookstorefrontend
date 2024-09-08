import React from 'react'
import BookList from './components/BookList'

const page = () => {
  return (
    <section>
      <div className='bg-[#D0E1E7] flex justify-center items-center h-[50vh]'>
        <div>
        <h1 className='text-center'>Our Shop</h1>
            <p className='text-center'>Home - ShOP Default</p>
        </div>
        
            
      </div>
      <div className='px-10'>
            <BookList/>
        </div>
    </section>
  )
}

export default page
