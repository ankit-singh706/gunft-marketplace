# gunft-marketplace

## Smart Contracts

There are two smart contracts:
- `GuNFT` -> ERC721 contract to mint NFTs; transfer ownership
- `Marketplace` -> Buy and sell NFTs

Contracts are deployed on Polygon Mumbai Testnet:
- `GuNFT`
  - Contract Address: 0x534DaeAC6c03480755c9CDF1b7452e6aC62Ad59d
  - Polygonscan: https://mumbai.polygonscan.com/token/0x534daeac6c03480755c9cdf1b7452e6ac62ad59d
- `Marketplace`
  - Contract Address: 0x27e3980B949F3c9360E488724AB27d193e5759ff
  - Polygonscan: https://mumbai.polygonscan.com/address/0x27e3980B949F3c9360E488724AB27d193e5759ff

We tried to use Biconomy for Gasless Transactions but failed to do so since Vite apps aren't yet supported

## IPFS

Initially the models were uploaded to IPFS as a folder. Those can be found here: ipfs://bafybeiem5gn34ejnmbb3idbc7hszmprqrc3zvpintn7o6fyxcqts7f3fxi/ <br>
Metadata for these models are at: ipfs://bafybeihjmhtclyhigayikvzoxd7jc5gciqzbtobvdbhani5xmq7bd4uita/ <br>
[The models after 0 are 3D models of .glb format]


Now to allow users to mint NFTs with new textures for gun models, we're allowing the NFT to be minted with a `tokenURI`. <br>
An example model is uploaded at: ipfs://bafybeiczx6mwsgz6m7nxxks5t6jqswlkbykg45nuvi3dwcc53d4zclbvty/ <br>
Metadata at: ipfs://bafybeibrzfopa3z7fgl6e7gayzvab4xpb56epaivylcw5nxn7grgofqjmy/


## Game
The FPS game is built using Unity and Photon (for Multiplayer). <br>
A downloadable version of the game is deployed at https://mahesh-2029.itch.io/gunft


## Website
Website is hosted at https://gunft-marketplace.vercel.app/ <br>
We've tried to deploy a docker image using StackOS at: https://gunft-poddb271b698497a58269cdc1c3c2b29b760404041-authority.stackos.io

It is an NFT marketplace where custom gun mods can be minted and also NFTs can be bought and sold.
