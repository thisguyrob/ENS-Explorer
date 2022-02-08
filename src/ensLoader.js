import React, {useState} from 'react'
import {ethers} from 'ethers';
import 'remixicon/fonts/remixicon.css'
import './tempStyle.css';
import ENSexplorer from './ensExplorer.js';

const ENSLoader = () => {


return (
	<div>
	<div class="container">
  <div class="box"></div>
  <div class="box overlay"></div>
</div>

	<div class='App'>
	<ENSexplorer/>
	</div>
	</div>
	)

}

export default ENSLoader;