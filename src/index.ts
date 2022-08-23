import net from "node:net";
import {
  RealtimeInterface,
  RealtimeInterfaceLayout,
} from "./RealtimeInterface";

export class UniversalRobotClient {
  readonly client: net.Socket;
  protected connected = false;
  data?: RealtimeInterface;
  dataCounter = 0;

  constructor(port: number, host: string) {
    this.client = net.createConnection(port, host, () => {
      // connect listener
      this.connected = true;
      console.log("universal robot connected");
    });
    this.client.on("data", (data) => {
      this.data = RealtimeInterfaceLayout.decode(data);
      this.dataCounter++;
    });
    this.client.on("end", () => {
      this.connected = false;
      console.log("universal robot disconnected");
    });
  }
}
