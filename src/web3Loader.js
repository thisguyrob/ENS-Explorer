import React, {useState} from 'react';
import {ethers} from 'ethers';
import ENSexplorer from './ensExplorer.js';
import './style.css';

const Web3Loader = () => {

  const [showLogin, setShowLogin] = useState('show');
  const [showApp, setShowApp] = useState('hide');

  const [provider, setProvider] = useState(null);
  const [resolver, setResolver] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setdefaultAccount] = useState('Not Connected');
  const [connectButtonText, setconnectButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {

      window.ethereum.request({ method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
      })
      .catch(error => {
        setErrorMessage(error.message);
      
      });

    } else {
      console.log('Need to install MetaMask');
      alert('Please install MetaMask browser extension to interact');
    }
  }
  
  const accountChangedHandler = (newAccount) => {
    setdefaultAccount(newAccount);
    setShowApp('show');
    setShowLogin('hide');
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
  }

  return (
    <div>
    <div class={showLogin}>
      <div class='loginButton'>
        <button onClick={connectWalletHandler}> {connectButtonText}</button>
      </div>
    </div>
    <div className={showApp}>
    <ENSexplorer defaultAccount = {defaultAccount}/>
    </div>
    </div>
  );
}

export default Web3Loader;
