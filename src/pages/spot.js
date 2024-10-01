import React from 'react'
import Order from '../component/order'
import Orderhis from '../component/orderhis'
import Pricechart from '../component/pricechart'
import Priceorder from '../component/priceorder'

function Spot() {
  return (
    <section class="pt-36">
    <div class="py-4 mx-auto max-w-screen-xl sm:py-4">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <div class="col-span-2 sm:col-span-1 md:col-span-2  flex flex-col">
          
          <Pricechart class=""/>
          
          </div>
       
    
         
          <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
          
            <div class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 ">
             <Order/>
            </div>
            <div class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4">
             <Orderhis/>
          </div>
        </div>
       
      </div>

      <div class="col-span-2 sm:col-span-1 md:col-span-  h-auto md:h-full flex flex-col">
         <Priceorder/>
        </div>
    
    </div>
  </section>
    
  
  )
}

export default Spot