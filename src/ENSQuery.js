import React, {useState} from 'react'
import {ethers} from 'ethers';


const ENSQuery = () => {

	function removeIPFS(url) {
		return url.replace(/^ipfs?:\/\//, '');
	}

	const ipfsGatewayURL = 'https://ipfs.io/ipfs/'

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setdefaultAccount] = useState('Not Connected');
	const [connectButtonText, setconnectButtonText] = useState('Connect Wallet');

	const [resolver, setResolver] = useState(null);
	const [avatar, setAvatar] = useState('https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a');

	const [ensQuery, setensQuery] = useState('brantly.eth');

	let currentENSAddress = 'No ENS Detected';

	const [provider, setProvider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setconnectButtonText('Wallet Connected');
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
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);
		tempProvider.getResolver(ensQuery)
		.then(result => {
			let tempResolver = result;
			setResolver(tempResolver);
			console.log(tempResolver);
		});
	}

	const ensQueryStart = () => {
		console.log(resolver)
		resolver.getAvatar()
		.then(result => {
			console.log(result);
			let tempAvatar = result.url;
			setAvatar(tempAvatar);
		});
		resolver.getContentHash()
		.then(result => {
			console.log(result);
		});

		console.log(tempAvatar);
	}

	return (
		<center><div>
			<h1>{"Get/Set Interaction with Contract!"}</h1>
			<button onClick={connectWalletHandler}> {connectButtonText}</button>
		<h3> Address: {defaultAccount}</h3>
		<h3> ENS: {currentENSAddress}</h3>
		<button onClick={ensQueryStart}>Search</button>
		<div><img src={avatar} alt="ENS Avatar" width="150" height="150"></img></div>
		</div></center>
		)
}

export default Web3explorer;