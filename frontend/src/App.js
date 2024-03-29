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
  const contractAddress = "0x1A8d73fEC36e4D265C3718581A4C6B12dCDF4170";
  const contractABI = abi.abi;
  const [projectList, setProjectList] = useState([]);

  // form elements

  const [projectName, setProjectName] = useState("");
  const [projectDes, setProjectDes] = useState("");
  const [minimumContrib, setminimumContrib] = useState(0);
  const [targetContrib, settargetContrib] = useState(0);
  const [ethContribution, setethContribution] = useState(0);



  const contribute = async (ethContribution, sender, id) => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        const temp = await crowdFundContract.contribute(id, { value: ethers.utils.parseEther(ethContribution) });
        console.log(temp);
        setProjectList(temp);
        // return  temp;


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const extract = async (id) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        let waveTxn = await crowdFundContract.extract(id, {
          gasLimit: 100000,
        });
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        getProject();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
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
    getProject();
  }, [])

  const getProject = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        const temp = await crowdFundContract.returnProjects();
        console.log(temp);
        setProjectList(temp);
        // return  temp;

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addProject = async (event) => {
    event.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {

        // calling the contract!
        let temp = 1
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const crowdFundContract = new ethers.Contract(contractAddress, contractABI, signer);
        let waveTxn = await crowdFundContract.addProject(projectName, projectDes, currentAccount, parseInt(minimumContrib), parseInt(targetContrib), parseInt(temp), "asd", parseInt(temp));
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        getProject();
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
                <input type="text" name="Name" className={"ms-5"} onChange={(e) => setProjectName(e.target.value)} />
              </label>

              <label className="d-block">
                Description:
                <input type="text" name="Description" className={"ms-3"} onChange={(e) => setProjectDes(e.target.value)} />
              </label>

              <label className="d-block mt-2">
                Minimum Contribution :
                <input type="text" name="Minimum" className={"ms-4"} onChange={(e) => setminimumContrib(e.target.value)} />
              </label>

              <label className="d-block">
                Target Contribution   :
                <input type="text" name="Target" className={"ms-5"} onChange={(e) => settargetContrib(e.target.value)} />
              </label>
              <input type="submit" value="Add Project!" className="w-100 p-1 m-3" />
            </form>

          </div>
        )}

        {currentAccount && (
          <h1 className="w-100 text-center mt-5">Project List</h1>
        )}

        {projectList.map(project => (
          <div className={"w-100"}>
            <div className={"card"}>
              <div className={"card-body"}>
                <h5 className={"card-title"}>{Number(project[6])}. <span> </span>
                  {project[0]}</h5>
                <p className={"card-text"}>Description: {project[1]}</p>
                <p className={"card-text"}>Minimum Contribution: {Number(project[3])} eth</p>
                <p className={"card-text"}>Target Contribution: {Number(project[4])} eth</p>
                <p className={"card-text"}>Amount Contributed: {Number(project[8])/10**18} eth</p>
                <form onSubmit={e => {
                  e.preventDefault();
                  console.log("oie ", project);
                  contribute((e.target[0].value), String(currentAccount), Number(project[6]));
                }}>
                  <label className="d-block">
                    Contribution amount :
                    <input type="text" name="ethContrib" className={"ms-2"} onChange={(e) => setethContribution(e.target.value)} />
                    <button className={"btn"} >Click this button to contribute! </button>

                  </label>
                  
                </form>
                {/* <button className={"btn"} onClick={e => {
                    console.log(Number(project[6]));
                    extract(Number(project[6]));
                  }}> Extract contributions from the smart contract! </button> */}
              </div>

            </div>
          </div>

        ))}

      </div>
    </div>)
}

export default App;