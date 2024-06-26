import { ApiMessage } from "../api/ServerActionApi";

console.log("Created worker");

self.onmessage = (event: MessageEvent) => {
  console.log("Entered worker");
  let { userMessages, result } = event.data;
  console.log("User message: ", userMessages);

  userMessages += result;
  self.postMessage({ response: "done" });
};

export default {} as typeof Worker & { new (): Worker };
