import { useAccount } from "wagmi";
import {
  SelectPaymentSettings,
  useSelectPaymentModal,
} from "@0xsequence/checkout";
import { saleConfig } from "../saleConfig";
import { encodeFunctionData, toHex } from "viem";
import { Button, Card } from "boilerplate-design-system";

export function Checkout() {
  const { address: recipientAddress } = useAccount();
  const { openSelectPaymentModal } = useSelectPaymentModal();

  const onClickSelectPayment = () => {
    if (!recipientAddress) {
      return;
    }

    const collectibles = [
      {
        tokenId: saleConfig.itemForSale,
        quantity: "1",
      },
    ];

    const erc1155SalesContractAbi = [
      {
        type: "function",
        name: "mint",
        inputs: [
          { name: "to", type: "address", internalType: "address" },
          { name: "tokenIds", type: "uint256[]", internalType: "uint256[]" },
          { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
          { name: "data", type: "bytes", internalType: "bytes" },
          {
            name: "expectedPaymentToken",
            type: "address",
            internalType: "address",
          },
          { name: "maxTotal", type: "uint256", internalType: "uint256" },
          { name: "proof", type: "bytes32[]", internalType: "bytes32[]" },
        ],
        outputs: [],
        stateMutability: "payable",
      },
    ];

    const purchaseTransactionData = encodeFunctionData({
      abi: erc1155SalesContractAbi,
      functionName: "mint",
      args: [
        recipientAddress,
        collectibles.map((c) => BigInt(c.tokenId)),
        collectibles.map((c) => BigInt(c.quantity)),
        toHex(0),
        saleConfig.currencyAddress,
        saleConfig.price,
        [toHex(0, { size: 32 })],
      ],
    });

    const selectPaymentModalSettings: SelectPaymentSettings = {
      collectibles,
      chain: saleConfig.chainId,
      price: saleConfig.price,
      targetContractAddress: saleConfig.salesContractAddress,
      recipientAddress,
      currencyAddress: saleConfig.currencyAddress,
      collectionAddress: saleConfig.nftTokenAddress,
      creditCardProviders: ["sardine"],
      copyrightText: "ⓒ2024 Sequence",
      onSuccess: (txnHash: string) => {
        console.log("success!", txnHash);
      },
      onError: (error: Error) => {
        console.error(error);
      },
      txData: purchaseTransactionData,
    };
    openSelectPaymentModal(selectPaymentModalSettings);
  };

  return (
    <CheckoutWithSequencePay onClickSelectPayment={onClickSelectPayment} />
  );
}

const CheckoutWithSequencePay = ({
  onClickSelectPayment,
}: {
  onClickSelectPayment: () => void;
}) => {
  return (
    <Card className="flex flex-col gap-5 items-center p-6 bg-white/10 border border-white/10 backdrop-blur-sm text-center">
      <div className="flex flex-col">
        <h2 className="text-18 font-bold">Checkout with Sequence Pay</h2>

        <p className="text-grey-100 text-15">
          Purchase an NFT using various purchase methods
        </p>
      </div>
      <Button
        variant="primary"
        variant-padding="comfortable"
        onClick={onClickSelectPayment}
      >
        Open Checkout
      </Button>
    </Card>
  );
};
