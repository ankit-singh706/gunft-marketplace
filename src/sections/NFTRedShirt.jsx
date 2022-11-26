/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/


import React, { Suspense,useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RedShirt from "../../public/Red_shirt";
import NFTMarket from "../components/NFTMarket";


const NFTRedShirt = () =>{

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


    return(
        <>
        
        <div className='showcase_container'>
            <div className="showcase">
                <div className="gun_model">
                <Canvas className="canvas_bg" camera={{ position: [25,15, -8.5], fov: 55 }}>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Suspense fallback={null}>
                        <RedShirt/>
                        <OrbitControls />
                    </Suspense>
                    </Canvas>
                </div>
                <div className="gun_model_name">
                    MERCHANDISE TSHIRT #224
                </div>
                <div className="gun_model_desc">
                    <p>Merchandise (or merch) is a product that can be bought or sold. In today’s society, merchandise makes the world go around and fulfills our economic needs. Without merchandise, it’s difficult for modern consumers to survive. Everything, whether you consider it a want or a need, is merchandise. Merchandise is important because all our needs are met with their help. </p>
                </div>
            </div>
            <div className="showcase_details">
            <div className="customs">
                        {/* <div className="scope_availability">
                            <h2>Apply Scope</h2>
                            <div className="checks">
                                <button onClick={setScope}>Yes</button>
                                <button onClick={removeScope}>No</button>
                            </div>
                        </div> */}
                        {/* <p className="para">Press 'YES/NO' to attach/remove Scope</p>
                        <p className="para">An aiming instrument that indicates where your bullet should impact.</p>
                        <hr /> */}
                        {/* <div className="muzzle_availability">
                            <h2>Attach Muzzle</h2>
                            <div className="checks">
                                <button onClick={setMuzzle}>Yes</button>
                                <button onClick={removeMuzzle}>No</button>
                            </div>
                        </div> */}
                        {/* <p className="para">Press 'YES/NO' to attach/remove Muzzle</p> */}
                        <p className="para_cap">A short-sleeved casual top, generally made of cotton, having the shape of a T when spread out flat.</p>
                        <hr />
                    </div>
                    <div className="mint_nft">
                        <p>Buy NFT</p>
                    </div>
            </div>
        </div>
        <NFTMarket heading="Explore Skins"/>
        </>
    )
}

export default NFTRedShirt;