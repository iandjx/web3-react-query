import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { useState } from "react";
import {
  coinbaseWallet,
  hooks as coinbaseWalletHooks,
} from "../connectors/coinbaseWallet";
import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";
import { hooks as networkHooks, network } from "../connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "../connectors/walletConnect";
import { getName } from "../utils";
import { Pokemon } from "./Pokemon";

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
];

function Child() {
  const { connector, account } = useWeb3React();
  const [pollingInterval, setPollingInterval] = useState(0);
  console.log(`Priority Connector is: ${getName(connector)}`);
  const pokemon = [{ foo: "charmander", bar: "adfs", account }];
  if (!account) return null;
  return (
    <div className="App">
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
        ))}
      </div>
    </div>
  );
}

export default function ProviderExample() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
    </Web3ReactProvider>
  );
}
