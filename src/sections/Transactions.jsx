import { useState, useEffect } from "react";
import { ethers } from "ethers";
import gunFTabi from '../GuNFT_ABI.json';
// import ErrorMessage from "./ErrorMessage";
// import TxList from "./TxList";

export default function Transacts() {
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState();
  const [contractInfo, setContractInfo] = useState({
    address: "0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  });
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gunft_contract = new ethers.Contract(
        contractInfo.address,
        gunFTabi,
        provider
      );

      gunft_contract.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount)
          }
        ]);
      });
      setContractListened(gunft_contract);

      return () => {
        // contractListened.removeAllListeners();
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const gunft_contract = new ethers.Contract("0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0", gunFTabi, provider);

    console.log(await gunft_contract.mintCost)
    gunft_contract.mintCost().then((e)=>{
        console.log(e.toString())
    })

    // const tokenName = await gunft_contract.name();
    // const tokenSymbol = await gunft_contract.symbol();
    // const totalSupply = await gunft_contract.totalSupply();

    setContractInfo({
      address: data.get("addr"),
    //   tokenName,
    //   tokenSymbol,
    //   totalSupply
    });
  };

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const gunft_contract = new ethers.Contract(contractInfo.address, gunFTabi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await gunft_contract.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance)
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const gunft_contract = new ethers.Contract(contractInfo.address, gunFTabi, signer);
    // await gunft_contract.transfer(data.get("recipient"), data.get("amount"));
    const options = {value: ethers.utils.parseEther("0.001")}
    await gunft_contract.safeMint("0xFd8C39f22b7Fd754e78211918B49478A37eDd3fF",options);

    
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div>
        <form className="m-4" onSubmit={handleSubmit}>
          <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          </div>
        </form>
        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Write to contract
            </h1>

            <form onSubmit={handleTransfer}>
              <div className="my-3">
                <input
                  type="text"
                  name="recipient"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Recipient address"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  name="amount"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Amount to transfer"
                />
              </div>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                >
                  Transfer
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Recent transactions
            </h1>
            <p>
              {/* <TxList txs={txs} /> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
