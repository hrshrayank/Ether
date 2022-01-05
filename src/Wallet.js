import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './Wallet.css'
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


const Wallet = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				console.log(result)
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const disconnectWalletHandler=()=> {
		setDefaultAccount(null)
		setProvider(null)
		setUserBalance(null)
		setConnButtonText("Connect Wallet")
	}

useEffect(() => {
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
	};
}, [defaultAccount]);
	
	return (
		<div className='container'>
        <Card >
		
        <CardMedia
          component="img"
          height="50"
          image="wallet.png"
          alt="green iguana"
        />
        
        <CardContent>
        <Stack spacing={3} direction="row" pl ={35}>
      
            <Button variant="contained"onClick={connectWalletHandler} >{connButtonText}</Button>
            <Button variant="outlined" color="error" onClick={disconnectWalletHandler} >Clear</Button>
        </Stack>
         
         {
		 defaultAccount && <Typography variant="body1" py={3} >
		  Address: {defaultAccount}
          </Typography>
		  } 
		 {
		 userBalance &&  <Typography variant="body1" >
		  Balance: {userBalance}
          </Typography>
		}
        </CardContent>
       
		{errorMessage}
      </Card>
	  </div>
		
	);
}

export default Wallet;