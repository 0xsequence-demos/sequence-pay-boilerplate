import { useOpenWalletModal } from "@0xsequence/kit-wallet";
import { Button, Card } from "boilerplate-design-system";

export function Inventory() {
  const { setOpenWalletModal } = useOpenWalletModal();
  const openInventory = () => setOpenWalletModal(true);

  return (
    <Card className="flex flex-col gap-5 items-center p-6 bg-white/10 border border-white/10 backdrop-blur-sm text-center">
      <div className="flex flex-col">
        <h2 className="text-18 font-bold">Inventory</h2>
        <p className="text-grey-100 text-15">
          Open a modal to view your inventory
        </p>
      </div>
      <Button
        variant="primary"
        variant-padding="comfortable"
        onClick={openInventory}
      >
        Open Inventory
      </Button>
    </Card>
  );
}
