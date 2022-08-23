import { RealtimeInterfaceLayout } from "../src/RealtimeInterface";
import { UniversalRobotClient } from "../src";
console.log("struct span", RealtimeInterfaceLayout.span);

let client = new UniversalRobotClient(1234, "192.168.0.1");
setTimeout(() => {
  console.log("data", client.dataCounter, client.data);
}, 5000);
