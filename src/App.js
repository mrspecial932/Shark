import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './component/header';
import Home from './pages/Home';
import Spot from './pages/spot';
import Future from './pages/future';
import config  from './config.json';
import { useDispatch } from 'react-redux';
import { loadProvider , loadNetwork, loadAccount, loadToken, loadExchange } from './store/interaction'; 

export default function App() {

  const dispatch = useDispatch()

   const loadBlockChainData =  async()=>{
   
    //connect ethers to blockchain
    const provider =  loadProvider(dispatch)
    
    //fetching current netwotks chainId(e.g hardhat: 31337)
    const chainId = await loadNetwork(provider, dispatch)
    console.log(chainId)

    //Fetch current account & balance from metamask
    window.ethereum.on("accountsChanged", ()=>{
       loadAccount(provider , dispatch)
    })
  
    const Shark=config[chainId].Shark
    const mEth=config[chainId].mETH

    //read the token smart Contract
    const exchange=await loadToken (provider, [Shark.address , mEth.address], dispatch)

    //load exchange Contract
    const exchangeConfig=config[chainId].exchange
    await loadExchange(provider , exchangeConfig.address, dispatch)
    console.log(exchange.address)
    
     }  
   useEffect(()=>{
     loadBlockChainData()
     
   })
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Home" element={<Home/>} />
        <Route path="/spot" element={<Spot/>} />
        <Route path="/future" element={<Future/>} />
      </Routes>
    </Router>
  );
}