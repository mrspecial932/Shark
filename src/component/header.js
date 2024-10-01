import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {Link, link} from "react-router-dom"

import { loadAccount } from '../store/interaction';


export default function Header({}) {

   const account = useSelector(state => state.provider.account)
   const Balance = useSelector(state=>state.provider.balance)
   const provider = useSelector(state=>state.provider.connection)

   const dispatch = useDispatch()
  const connectHandler = async()=>{
    await loadAccount(provider, dispatch)
  }
  return (
    <header className='bg-slate-800 bg-opacity-30 backdrop-filter backdrop-blur-lg fixed w-full px-[30px] lg:px-[100px]
    z-30 h-[60px] lg:h-[70px] flex items-center mx-auto border-r-slate-700 opacity-1 '>
        <div className='flex flex-row lg:flex-row lg:items-center w-full'>

        <Link to ={"/"}>
        <h1 className='font-semibold text-2xl text-slate-100'>Shark</h1>
        </Link>

          <nav className='hidden md:flex lg:flex gap-x-12 mx-12 mt-1'>
            <Link to ={"/home"} className='text-[#fff] hover:text-purple-600'>Home</Link>
            <Link to ={"/spot"} className='text-[#fff] hover:text-purple-600'>Spot</Link>
            <Link to ={"/future"} className='text-[#fff] hover:text-purple-600'>Future</Link>
          </nav>  

          
         
      
        </div>
        <div className='items-end  ' >
        
        <div  className='flex  w-120  rounded-md px-2'>
                {Balance ?(
                  <p className=' mt-2 text-center w-40 '>Balance : {Number(Balance).toFixed(4)}</p>
                ):(
                <></>
                )
                
                }

            {account ? (
            
              
            <button className='ring-2 ring-[#13ec36] bg-green-500 p-2 rounded-md text-slate-50 hover:bg-[#13ec36] '>
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
          
            ):(
              <button className='ring-2 ring-[#13ec36] p-2 rounded-md  text-slate-50 hover:bg-[#13ec36] ' 
              onClick={connectHandler}
              > 
                Connect
              </button>
              
          
            )
              
            }
            </div>
        
          </div>
        
    </header>  
  )
}
