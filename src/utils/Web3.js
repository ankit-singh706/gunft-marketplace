import { useState, useEffect } from "react";
import { ethers } from "ethers";
import gunFTabi from '../GuNFT_ABI.json';
// import ErrorMessage from "./ErrorMessage";
// import TxList from "./TxList";

const contractAddress = "0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0"


const provider = new ethers.providers.Web3Provider(window.ethereum);
const gunft_contract = new ethers.Contract(contractAddress,gunFTabi,provider)

function getContract() {
    return gunft_contract
}

// function setProvider()

function setContract(address,abi,provider) {
    gunft_contract = new ethers.Contract(address,abi,provider)
}


//   const [contractInfo, setContractInfo] = useState({
//     address: "0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0",
//     tokenName: "-",
//     tokenSymbol: "-",
//     totalSupply: "-"
//   });
//   useEffect(() => {
//     if (contractInfo.address !== "-") {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const gunft_contract = new ethers.Contract(
//         contractInfo.address,
//         gunFTabi,
//         provider
//       );

//       gunft_contract.on("Transfer", (from, to, amount, event) => {
//         console.log({ from, to, amount, event });

//         setTxs((currentTxs) => [
//           ...currentTxs,
//           {
//             txHash: event.transactionHash,
//             from,
//             to,
//             amount: String(amount)
//           }
//         ]);
//       });
//       setContractListened(gunft_contract);

//       return () => {
//         // contractListened.removeAllListeners();
//       };
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.target);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     const gunft_contract = new ethers.Contract("0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0", gunFTabi, provider);

//     console.log(await gunft_contract.mintCost)
//     gunft_contract.mintCost().then((e)=>{
//         console.log(e.toString())
//     })

    // const tokenName = await gunft_contract.name();
    // const tokenSymbol = await gunft_contract.symbol();
    // const totalSupply = await gunft_contract.totalSupply();

    // setContractInfo({
    //   address: data.get("addr"),
    // //   tokenName,
    // //   tokenSymbol,
    // //   totalSupply
    // })


  export async function getMyBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const gunft_contract = new ethers.Contract(contractAddress, gunFTabi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await gunft_contract.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance)
    });
  };

  export const handleTransfer = async (e) => {
        // e.preventDefault();
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const gunft_contract = new ethers.Contract(contractAddress, gunFTabi, signer);
        // await gunft_contract.transfer(data.get("recipient"), data.get("amount"));
        const options = {value: ethers.utils.parseEther("0.001")}
        await gunft_contract.safeMint("0xFd8C39f22b7Fd754e78211918B49478A37eDd3fF",options);
    }


