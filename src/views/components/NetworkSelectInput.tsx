import { InputSelect, setStoreData } from "boilerplate-design-system";
import { Chain } from "viem";
import { useSwitchChain } from "wagmi";

const SEQUENCE_ASSETS_URL_PREFIX = "https://assets.sequence.info/";
const VERSION = 5;
export const networkImageUrl = (
  chainId: number,
  size?: "small" | "medium" | "large",
) => {
  return (
    SEQUENCE_ASSETS_URL_PREFIX +
    `images/networks/${size}/${chainId}.webp?v${VERSION}`
  );
};

export function NetworkSwitchInputSelect({ chainId }: { chainId: string }) {
  const { chains, switchChainAsync } = useSwitchChain();

  function handleChainChange(value: string) {
    const onSwitchChain = async (chainId: string) => {
      const formmatedChainId = Number(chainId);
      await switchChainAsync({ chainId: formmatedChainId });
    };
    onSwitchChain(value);

    setStoreData("network", value);
  }

  if (chains.length < 2) {
    return (
      <dl className="flex flex-col items-start gap-1">
        <dt className="font-medium text-14">Network</dt>
        <dd className="w-full">
          <SingleChain chain={chains[0]} />
        </dd>
      </dl>
    );
  }

  return (
    <InputSelect
      name="network"
      defaultValue={chainId}
      onValueChange={handleChainChange}
      options={chains?.map((chain) => ({
        icon: networkImageUrl(chain.id, "small"),
        label: chain.name,
        value: chain.id.toString(),
      }))}
    />
  );
}

function SingleChain({ chain }: { chain: Chain }) {
  const icon = networkImageUrl(chain.id, "small");
  const label = chain.name;

  return (
    <div className="min-h-[2rem] px-4 py-3 flex items-center gap-2 border   border-white/20 rounded-md overflow-hidden ">
      <span className="flex gap-3 items-center text-white">
        {icon ? <img src={icon} className="size-5" width="20" alt="" /> : null}
        <span>{label}</span>{" "}
      </span>
    </div>
  );
}
