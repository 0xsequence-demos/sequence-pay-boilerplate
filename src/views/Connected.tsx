import { Group } from "boilerplate-design-system";
import { Inventory } from "../components/Inventory";
import { Checkout } from "../components/Checkout";

export function Connected() {
  return (
    <div className="flex flex-col gap-8">
      <Group>
        <Inventory />
        <Checkout />
      </Group>
    </div>
  );
}
