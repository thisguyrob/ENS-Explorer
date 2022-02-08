import React, {useState} from 'react';
import {ethers} from 'ethers';
import 'remixicon/fonts/remixicon.css';
import './style.css';

const ENSexplorer = () => {

	const [showLogin, setShowLogin] = useState('show');
	const [showApp, setShowApp] = useState('hide');

	const [walletText, setWalletText] = useState('Connect Wallet');
	const [defaultAccount, setdefaultAccount] = useState('Not Connected');

	const [errorMessage, setErrorMessage] = useState(null);

	const [emailAddress, setEmailAddress] = useState(null);
	const [hashAddress, setHashAddress] = useState('https://ipfs.io/ipfs/QmRCDWZ5DZwD1YYZw8UxC4RnQhoYo3CVX66PobN6Vg664X');
	const [linkAddress, setLinkAddress] = useState(null);
	const [githubAddress, setGithubAddress] = useState(null);
	const [twitAddress, setTwitAddress] = useState(null);
	const [redditAddress, setRedditAddress] = useState(null);

	const [showName, setshowName] = useState('show');
	const [showLocation, setshowLocation] = useState('show');
	const [hashClass, setHashClass] = useState('show');
	const [emailClass, setEmailClass] = useState('show');
	const [githubClass, setgithubClass] = useState('show');
	const [linkedinClass, setlinkedinClass] = useState('show');
	const [twitterClass, settwitterClass] = useState('show');
	const [redditClass, setredditClass] = useState('show');
	const [discordClass, setdiscordClass] = useState('show');

	const [tempName, setTempName] = useState(null);
	const [tempENS, setTempENS] = useState(null);

	const [provider, setProvider] = useState(null);
	const [resolver, setResolver] = useState(null);

	const [ensAddress, setENSAddress] = useState('null.eth');
	const [name, setName] = useState('User Name');
	const [location, setLocation] = useState('The Blockchain');
	const [avatar, setAvatar] = useState('./profile.png');

	const connectWalletHandler = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			await window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
				setProvider(tempProvider);
				accountChangedHandler(result[0]);
				setWalletText(result[0]);
				setShowLogin('hide');
				setShowApp('show');
				tempProvider.lookupAddress(result[0])
				.then(result => {
				if (result !=null)
					setWalletText(result);
				else console.log(result)
			});
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			alert('Please install MetaMask browser extension to interact');
		}
	}
	
	const accountChangedHandler = async (newAccount) => {
		setdefaultAccount(newAccount);
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);
		tempProvider.lookupAddress(defaultAccount)
		.then(result => {
			console.log(result);
		})
	}

	const getENSResolver = async (e) => {
		setENSAddress(e);
		await provider.getResolver(e)
		.then(result => {
			let tempResolver = result
			tempResolver.getAvatar()
			.then(result => {
				if (result !=null)
					setAvatar(result.url);
				else setAvatar('./profile.png')
			});
			tempResolver.getText('name')
			.then(result => {
				if (result !=null) {
					setshowName('show');
					setName(result);
				}
				else setshowName('hide')
			});
			tempResolver.getText('location')
			.then(result => {
				if (result !=null) {
					setshowLocation('show');
					setLocation(result);
				}
				else setshowLocation('hide')
			});
			tempResolver.getText('email')
			.then(result => {
				if (result !=null) {
					setEmailClass('show');
					let mailto = 'mailto:'
					let mail = mailto.concat(result)
					setEmailAddress(mail);
				}
				else setEmailClass('hide')
			});
			tempResolver.getText('com.github')
			.then(result => {
				if (result !=null) {
					setgithubClass('show');
					let url = 'https://github.com/'
					let github = url.concat(result)
					setGithubAddress(github);
				}
				else setgithubClass('hide')
			});
			tempResolver.getText('com.linkedin')
			.then(result => {
				if (result !=null) {
					setlinkedinClass('show');
					let url = 'https://linkedin.com/in/'
					let linkedin = url.concat(result)
					setLinkAddress(linkedin);
				}
				else setlinkedinClass('hide')
			});
			tempResolver.getText('com.twitter')
			.then(result => {
				if (result !=null) {
					settwitterClass('show');
					let url = 'https://twitter.com/'
					let twitter = url.concat(result)
					setTwitAddress(twitter);
				}
				else settwitterClass('hide')
			});
			tempResolver.getText('com.reddit')
			.then(result => {
				if (result !=null) {
					setredditClass('show');
					let url = 'https://reddit.com/'
					let reddit = url.concat(result)
					setRedditAddress(reddit);
					console.log(reddit)
				}
				else setredditClass('hide')
			});
			tempResolver.getContentHash()
			.then(result => {
				if (result !=null) {
					let tempHash = removeIPFS(result)
					let hash = ipfsGatewayURL.concat(tempHash);
					setHashAddress(hash);
					console.log(hash);
				}
				else setHashAddress('https://ipfs.io/ipfs/QmRCDWZ5DZwD1YYZw8UxC4RnQhoYo3CVX66PobN6Vg664X')
			});
		})
	}

	const ipfsGatewayURL = 'https://ipfs.io/ipfs/'

	function removeIPFS(url) {
		return url.replace(/^ipfs?:\/\//, '');
	}



	return (

		<div>
    <div class={showLogin}>
       	<div class='container'>
       		<center>
	       		<a href='#' class='topbtn' onClick={connectWalletHandler}>
					<div class='btn-text'>{walletText}</div>
				</a>
				<a href='#'>Github</a>
			</center>
		</div>
    </div>
    <div class={showApp}>
   		<div class='ENSQuery'>

			<div class='sidebar'>
				<div class='profile'>
					<div class='profile-img'>
						<img src={avatar} alt={ensAddress}></img>
					</div>
					<div>
					</div>
					<div class={showName}>
						<div class='name'>
							<h1>{name}</h1>
						</div>
					</div>
					<span><center>@{ensAddress}</center></span>
					<div class={showLocation}><span><center><i class="ri-map-pin-line"></i>{location}</center></span></div>
					<br></br>
				</div>

				<div class='menu'>
					<div class={hashClass}>
						<a href='#' class='active'>
							<span class='icon'>
								<i class="ri-home-fill"></i>
							</span>
							&nbsp;Home
						</a>
					</div>
					<div class={emailClass}>
						<a href={emailAddress}>
							<span class='icon'>
								<i class="ri-mail-fill"></i>
							</span>
							&nbsp;Email
						</a>
					</div>
					<div class ={githubClass}>
						<a href={githubAddress} target='_blank'>
							<span class='icon'>
								<i class="ri-github-fill"></i>
							</span>
							&nbsp;GitHub
						</a>
					</div>
					<div class={linkedinClass}>
							<a href={linkAddress} target='_blank'>
								<span class='icon'>
								<i class="ri-linkedin-box-fill"></i>
							</span>
							&nbsp;LinkedIn
						</a>
					</div>
					<div class={twitterClass}>
						<a href={twitAddress} target='_blank'>
							<span class='icon'>
								<i class="ri-twitter-fill"></i>
							</span>
							&nbsp;Twitter
						</a>
					</div>
					<div class={twitterClass}>
						<a href={redditAddress} target='_blank'>
							<span class='icon'>
								<i class="ri-reddit-fill"></i>
							</span>
							&nbsp;Reddit
						</a>
					</div>
				</div>
			</div>

		</div>


			<div class='main-home'>
				<div class='header'>
					<div class='search'>
						<i class="ri-search-line"></i>
						<input
						    type="text"
						    placeholder="Search by ENS Address"
						    onChange={event => {this.setState({query: event.target.value})}}
						    onKeyPress={event => {
						                if (event.key === 'Enter') {
						                  let tempENS = (event.target.value);
						                  getENSResolver(tempENS);
						                }
						              }}
						/>
					</div>
					<div class='header-content'>
						<a href='#' class='btn'>
							<i class="ri-account-circle-line"></i>
							<div class='btn-text'>&nbsp;{walletText}</div>
						</a>
					</div>
				</div>
				<div class='container'>
					<div class='h_iframe'>
					<iframe src={hashAddress} title='IPFS Hash' frameBorder='0'></iframe>
					</div>
				</div>
			</div>

			<div class='iframe'>
			</div>

	</div>
</div>

		)
}

export default ENSexplorer;