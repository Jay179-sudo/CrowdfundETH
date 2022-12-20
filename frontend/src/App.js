import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/Crowdfund.json';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xD42568bD694eF25c0ee0E1b994588910c026d360";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();

  }, [])

  const getProject = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        return await crowdFundContract.returnProjects();

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addProject = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // take data from the form!


        // calling the contract!
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        let waveTxn = await crowdFundContract.addProject();
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container w-100 h-50">
      <div className="dataContainer">
        <div className={"container w-100 mx-auto p-5 text-center fs-1"}>
          Hey there! Welcome to CrowdFund-ETH!
        </div>



        {!currentAccount && (
          <button className="waveButton w-100 p-1" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {/* form rakha */}
        {currentAccount && (
          <div className="form element">
            <form onSubmit={addProject}>
              <label className="d-block">
                Name :
                <input type="text" name="Name" className={"ms-5"} />
              </label>

              <label className="d-block">
                Description:
                <input type="text" name="Name" className={"ms-3"} />
              </label>

              <label className="d-block mt-2">
                Minimum Contribution :
                <input type="text" name="Name" className={"ms-4"} />
              </label>

              <label className="d-block">
                Target Contribution   :
                <input type="text" name="Name" className={"ms-5"} />
              </label>
              <input type="submit" value="Add Project!" className="w-100 p-1 m-3" />
            </form>
            
          </div>
        )}

        {currentAccount && (
          <h1 className="w-100 text-center mt-5">Project List</h1>
        )}

      </div>
    </div>)
}

export default App;