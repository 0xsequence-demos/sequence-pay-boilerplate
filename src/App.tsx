import { getDefaultWaasConnectors, SequenceConnectProvider } from "@0xsequence/connect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import chains from "./utils/chains";
import { SequenceCheckoutProvider } from "@0xsequence/checkout";
import { SequenceWalletProvider } from "@0xsequence/wallet-widget";
import { saleConfig } from "./saleConfig";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

import { NotConnected } from "./views/NotConnected";
import { Connected } from "./views/Connected";
import { SequenceBoilerplate } from "boilerplate-design-system";

const queryClient = new QueryClient();

export default function Layout() {
  // Get your own keys on sequence.build
  const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
  const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
  const appleRedirectURI = window.location.origin + window.location.pathname;
  const walletConnectId = import.meta.env.VITE_WALLET_CONNECT_ID;

  const connectors = getDefaultWaasConnectors({
    walletConnectProjectId: walletConnectId,
    waasConfigKey,
    googleClientId,
    // Notice: Apple Login only works if deployed on https (to support Apple redirects)
    appleClientId,
    appleRedirectURI,
    /* Arbitrum sepolia chainId */
    defaultChainId: saleConfig.chainId,
    appName: "Kit Starter",
    projectAccessKey,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transports: { [key: number]: any } = {};

  chains.forEach((chain) => {
    transports[chain.id] = http();
  });

  const config = createConfig({
    transports,
    connectors,
    chains,
  });

  const kitConfig = {
    projectAccessKey,
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SequenceConnectProvider config={kitConfig}>
          <SequenceCheckoutProvider>
            <SequenceWalletProvider>
              <App />
            </SequenceWalletProvider>
          </SequenceCheckoutProvider>
        </SequenceConnectProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function App() {
  const { isConnected } = useAccount();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/sequence-pay-boilerplate"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
      name="Sequence Pay"
      description="Embedded Wallet"
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
