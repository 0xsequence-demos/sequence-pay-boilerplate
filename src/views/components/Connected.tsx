import { useAccount, useDisconnect } from "wagmi";
import {
  Card,
  Divider,
  Field,
  Group,
  Input,
  Label,
  SegmentedInput,
  ShowAddressWithDisconnect,
} from "boilerplate-design-system";
import { useNativeBalance } from "./NativeBalance";
import { NetworkSwitchInputSelect } from "./NetworkSelectInput";
import { Inventory } from "./Inventory";
import { Checkout } from "./Checkout";
export default function Connected() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const balance = useNativeBalance({ chain, address });

  return (
    <div className="flex flex-col gap-8">
      <Group title="User info">
        <Card style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
          {address ? (
            <ShowAddressWithDisconnect
              address={address}
              onDisconnect={() => disconnect()}
            />
          ) : null}

          {chain?.id?.toString() ? (
            <NetworkSwitchInputSelect chainId={chain?.id?.toString()} />
          ) : null}

          {chain?.name ? (
            <Field name="test-payments">
              <Label>{chain.name} balance for test payments:</Label>
              <SegmentedInput subvariants={{ width: "full" }}>
                <Input
                  type="text"
                  variant="transparent"
                  value={balance}
                  onChange={() => {}}
                  subvariants={{ width: "full" }}
                  readOnly
                />
              </SegmentedInput>
            </Field>
          ) : null}
        </Card>
      </Group>
      <Divider />
      <Group>
        <Inventory />
        <Checkout />
      </Group>
    </div>
  );
}
