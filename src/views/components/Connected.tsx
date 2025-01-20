import { Group } from "boilerplate-design-system";
import { Inventory } from "./Inventory";
import { Checkout } from "./Checkout";
export default function Connected() {
  return (
    <div className="flex flex-col gap-8">
      <Group>
        <Inventory />
        <Checkout />
      </Group>
    </div>
  );
}
