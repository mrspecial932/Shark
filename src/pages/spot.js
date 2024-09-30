import React from 'react'
import Order from '../component/order'
import Orderhis from '../component/orderhis'
import Pricechart from '../component/pricechart'
import Priceorder from '../component/priceorder'

function Spot() {
  return (
    <div className='pt-32 lg:px-24 max-w-8xl '>
      
    <div className=' grid grid-cols-3 h-full auto-rows-[300px] gap-12'>
       <Pricechart className="p-2 col-span-3 flex flex-col items-center "/>
      <Order className="p-2 flex flex-col items-center"/>
      <Priceorder className="p-2 flex flex-col items-center"/>
      <Orderhis className="p-2 flex flex-col items-center"/>
    </div>
  
    
    
    </div>
    
  
  )
}

export default Spot