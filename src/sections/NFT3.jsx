
import React, { Suspense,useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import M4_nightmare from '../M4_nightmare';
import * as THREE from "three";
import NFTMarket from "../components/NFTMarket";
import { useTexture } from "@react-three/drei";
import {ethers} from 'ethers';
import marketplaceABI from '../Marketplace_ABI.json';
import gunFTabi from '../GuNFT_ABI.json';


//Importing Textures



const NFT3 = () =>{

    const [currentScope, setCurrentScope] = useState(false)
    const [currentMuzzle, setCurrentMuzzle] = useState(false)

    // console.log(currentScope)
    const setScope = () => {
            setCurrentScope(true)
    }
    const removeScope = (obj) => {
            setCurrentScope(false)
        }

    const setMuzzle = () => { setCurrentMuzzle(true)}
    const removeMuzzle = () => {setCurrentMuzzle(false)}


    const handleBuy = async (itemId) => {
        // const [imagePath, name, description] = args
        // const result = await storeNFT(modelPath, model.name, model.description)
        // console.log("result ",result)

        const gunContractAddress = "0x1f3CFeB39797843878530eb75Da8ee9412fF168B"
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const gunft_contract = new ethers.Contract(gunContractAddress, gunFTabi, signer);

        const marketplaceContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        // const signer = await provider.getSigner();
        console.log("signer", signer)
        const marketplace_contract = new ethers.Contract(marketplaceContractAddress, marketplaceABI , signer);
        // const approvalEstimate = gunft_contract.estimateGas.setApprovalForAll(marketplaceContractAddress,true).then((a)=>{console.log("set approval estimate pass ",a)}).catch((e)=>{console.log("set approval estimate fail ",e)})
        // const approvalOptions = {gasLimit: approvalEstimate}
        gunft_contract.setApprovalForAll(marketplaceContractAddress,true).then((a)=>{console.log("set approval pass ",a)}).catch((e)=>{console.log("set approval fail ",e)})
        // const makeItemEstimate = marketplace_contract.estimateGas.makeItem(gunContractAddress,1,1).then((a)=>{console.log("make item estimate pass ",a)}).catch((e)=>{console.log("make item estimate fail ",e)})
        // const makeItemOptions = {gasLimit: makeItemEstimate}
        marketplace_contract.makeItem(gunContractAddress,1,1).then((a)=>{console.log("make item pass ",a)}).catch((e)=>{console.log("make item fail ",e)})
        // const itemTotalPrice = await marketplace_contract.getTotalPrice(itemId)
        // console.log(itemTotalPrice.toString())
        // const itemPriceEstimate = marketplace_contract.estimateGas.getTotalPrice(itemId).then((a)=>{console.log("item total price estimate pass ",a)}).catch((e)=>{console.log("item total price estimate fail ",e)})
        // const itemPriceOptions = {gasLimit: itemPriceEstimate}
        const itemTotalPrice = marketplace_contract.getTotalPrice(itemId).then((a)=>{console.log("item total price pass ",a)}).catch((e)=>{console.log("item total price fail ",e)})
        const options = {value: itemTotalPrice}
        console.log("options ",options)
        // const purchaseEstimate = marketplace_contract.estimateGas.purchaseItem(itemId,options).then((a)=>{console.log("purchase estimate pass ",a)}).catch((e)=>{console.log("purchase estimate fail ",e)})
        // const purchaseGaslimit = purchaseEstimate
        // const purchaseValue = itemTotalPrice
        // const purchaseOptions = {gasLimit: purchaseGaslimit,value:purchaseValue}
        marketplace_contract.purchaseItem(itemId,options).then((a)=>{console.log("purchase pass ",a)}).catch((e)=>{console.log("purchase fail ",e)})        

        // 0xFd8C39f22b7Fd754e78211918B49478A37eDd3fF
    }

   
    return(
        <>
        <div className='showcase_container'>
            <div className="showcase">
                <div className="gun_model">
                <Canvas className="canvas_bg" camera={{ position: [20,12, 18.5], fov: 55 }}>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Suspense fallback={null}>
                        <M4_nightmare/>
                        <OrbitControls />
                    </Suspense>
                </Canvas>
                </div>
                <div className="gun_model_name">
                    M416 NIGHTMARE #354
                </div>
                <div className="gun_model_desc">
                    <p>The M4 carbine (officially Carbine, Caliber 5.56 mm, M4) is a 5.56×45mm NATO, gas-operated,[b] magazine-fed carbine developed in the United States during the 1980s. It is a shortened version of the M16A2 assault rifle.
The M4 is extensively used by the United States Armed Forces.</p>
                </div>
            </div>
            <div className="showcase_details">
            <div className="customs">
                        <div className="scope_availability">
                            <h2>Apply Scope</h2>
                            <div className="checks">
                                <button onClick={setScope}>Yes</button>
                                <button onClick={removeScope}>No</button>
                            </div>
                        </div>
                        <p className="para">Press 'YES/NO' to attach/remove Scope</p>
                        <p className="para">An aiming instrument that indicates where your bullet should impact.</p>
                        <hr />
                        <div className="muzzle_availability">
                            <h2>Attach Muzzle</h2>
                            <div className="checks">
                                <button onClick={setMuzzle}>Yes</button>
                                <button onClick={removeMuzzle}>No</button>
                            </div>
                        </div>
                        <p className="para">Press 'YES/NO' to attach/remove Muzzle</p>
                        <p className="para">The end of the barrel out of which the bullet comes to help dampens the recoil.</p>
                        <hr />
                    </div>
                    <div className="mint_nft">
                        <p onClick={() => {handleBuy(0)}}>Buy NFT</p>
                    </div>
            </div>
        </div>
        <NFTMarket heading="Explore Skins"/>
        </>
    )
}

export default NFT3;