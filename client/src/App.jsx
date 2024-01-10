/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import abi from "./contracts/coffee.json"
import {ethers} from 'ethers'
import './App.css'
import Memos from './components/Memos'
import Buy from './components/Buy'

function App() {
  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount] = useState('Not connected');
  const [balance,setBalance] = useState('Loading...');

  useEffect(()=>{
    const template = async()=>{
      const contractAddress = "0x9fA5C1234dCC557e4214fbFf5E0C4a8871E4bFb1";
      const contractABI= abi.abi;
      try {
        const {ethereum} = window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })

        setAccount(account);
        
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        const balance = await provider.getBalance(account[0]);
        setBalance(ethers.formatEther(balance));
        setState({provider,signer,contract});
      } catch (error) {
        alert(error)
      }
    }
    template();
  },[])
  return (
    <div className='App'>
      Connected account : {account[0]}
      <br />
      Account balance: {balance} ETH
      <br />
      <Buy state={state}/>
      <Memos state={state}/>
    </div>
  )
}

export default App
