
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {Link, link} from "react-router-dom"

export default function Header({account,setAccount}) {
  
  

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
        <div className='items-end ' >
            {account ? (
              <button className='ring-2 ring-[#13ec36] p-2 rounded-md  text-slate-50 hover:bg-[#13ec36] '>
                {account.slice(0 , 6) + '...' + account.slice(38,42)}
              </button>
          
            ):(
              <button className='ring-2 ring-[#13ec36] p-2 rounded-md  text-slate-50 hover:bg-[#13ec36] ' > 
                Connect
              </button>
          
            )
              
            }
        
          </div>
        
    </header>  
  )
}
