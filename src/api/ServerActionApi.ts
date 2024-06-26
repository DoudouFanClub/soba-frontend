import axios from "axios";
import Worker from "../worker/LoadConversationWorker.ts?worker";
import { useEffect } from "react";

import useChatStream from "@magicul/react-chat-stream";

export interface ApiResponse {
  response: string;
}

export interface ApiStringArrayResponse {
  response: string[];
}

export interface ApiMessage {
  Role: string;
  Content: string;
}

export interface CompleteApiMessagePrompt {
  Username: string;
  Title: string;
  Contents: ApiMessage[];
}

/**
 * Used For Loading of Chats in the Conversation View
 */
export interface MessageArrayData {
  Title: string;
  Messages: ApiMessage[];
}
export interface ApiLoadChatResponse {
  response: MessageArrayData;
}

//const worker = new Worker();

/**
 * Handles the LoadChat Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to retrieve the Chat History
 * @param username
 * @param title
 * @returns
 */
export const LoadChatRequest = async (username: string, title: string): Promise<ApiLoadChatResponse> => {
  console.log("Sending GET Chat Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/load_chat",
      {
        username: username,
        title: title,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;

    // Take response.data and filter it into a TextBlock (string[])
    // and return it to render
  } catch (error) {
    console.error("Error:", error);

    const falseMsg: MessageArrayData = {
      Title: "error",
      Messages: [],
    };
    const errorMsg: ApiLoadChatResponse = {
      response: falseMsg,
    };
    return errorMsg;
  }
};

export async function* decodeStreamToJson(data: ReadableStream<Uint8Array> | null): AsyncIterableIterator<string> {
  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      console.log("Done in decode stream to json");
      break;
    }

    if (value) {
      try {
        yield decoder.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

/**
 * Handles the SendMessage Request using REST API to communicate with
 * the Backend Server
 * Sends to the Backend Server the User's Prompt to forward to the LLM Model
 * and awaits for the LLM response
 * @param username
 * @param title
 * @param msg
 * @param msges
 * @returns
 */

export const HandleSendMessage = (username: string, title: string, msg: string, msges: ApiMessage[]) => {
  const handleClick = async () => {
    try {
      const userMsg: ApiMessage = {
        Role: "user",
        Content: msg,
      };

      console.log("USER MSG", msg);

      msges.push(userMsg);
      // check for original length
      const origLength = msges.length;

      var JsonBodyToSend: CompleteApiMessagePrompt = {
        Username: username,
        Title: title,
        Contents: msges,
      };

      // const apiMessage: ApiMessage = {
      //   Role: "assistant",
      //   Content: "",
      // };
      // msges.push(apiMessage);

      //console.log(JSON.stringify(JsonBodyToSend));

      const response = await fetch("http://localhost:8080/send_message", {
        method: "POST",
        body: JSON.stringify(JsonBodyToSend), // change this to pack as a different json method
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Unable to fetch from backend");
        return;
      }

      // const worker = new Worker();

      console.log("Before chunk");
      for await (const chunk of decodeStreamToJson(response.body)) {
        // console.log("Chunk: ", chunk);
        if (msges.length == origLength) {
          const apiMessage: ApiMessage = {
            Role: "assistant",
            Content: "",
          };

          msges.push(apiMessage);
          // const workerData = { userMessages: msges[origLength].Content, result: chunk };
          // worker.postMessage(workerData);
          msges[origLength].Content += chunk;
        } else {
          msges[origLength].Content += chunk;
        }

        // worker.terminate();
      }
      console.log("After chunk");
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  return handleClick;
};

/**
 * Handles the Retrieve Conversation Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to retrieve the Conversation Titles associated with Username
 * @param username
 * @returns
 */
export const RetrieveConversationTitlesRequest = async (username: string): Promise<ApiStringArrayResponse> => {
  console.log("Attempting to Retrieve Conversation Titles");
  try {
    const response = await axios.post(
      "http://localhost:8080/retrieve_convo_titles",
      {
        username: username,
        titles: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errResponse: ApiStringArrayResponse = {
      response: [],
    };

    return errResponse;
  }
};
