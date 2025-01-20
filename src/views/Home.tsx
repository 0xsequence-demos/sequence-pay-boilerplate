import { useAccount } from "wagmi";

import NotConnected from "./components/NotConnected";
import Connected from "./components/Connected";
import { SequenceBoilerplate } from "boilerplate-design-system";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/sequence-pay-boilerplate"
      name="Sequence Pay Boilerplate"
      description="Embedded Wallet"
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
};

export default Home;
