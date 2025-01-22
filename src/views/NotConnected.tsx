import { useOpenConnectModal } from "@0xsequence/kit";
import { Button } from "boilerplate-design-system";

export function NotConnected() {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <div className="w-full flex flex-col items-center">
      <Button
        variant="primary"
        subvariants={{ padding: "comfortable" }}
        onClick={() => setOpenConnectModal(true)}
      >
        Connect
      </Button>
    </div>
  );
}
