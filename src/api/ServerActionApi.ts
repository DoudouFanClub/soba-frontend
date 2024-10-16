import axios from "axios";

export interface ApiResponse {
  response: string;
}

export interface ApiStringArrayResponse {
  response: string[];
}

export interface ApiMessage {
  role: string;
  content: string;
}

export interface UserApiMessagePrompt {
  Username: string;
  Title: string;
  Contents: ApiMessage;
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
  title: string;
  messages: ApiMessage[];
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
export const LoadChatRequest = async (username: string, title: string, prevTitle: string): Promise<ApiLoadChatResponse> => {
  console.log("Sending GET Chat Request");
  console.log(prevTitle);
  try {
    const response = await axios.post(
      "http://192.168.0.100:8080/load_chat",
      {
        username: username,
        title: title,
        prevtitle: prevTitle,
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
      title: "error",
      messages: [],
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
type hookMsgCallback = React.Dispatch<React.SetStateAction<ApiMessage[]>>;
export const HandleSendMessage = (username: string, title: string, msg: string, msges: ApiMessage[], setMsgCallback: hookMsgCallback) => {
  const handleClick = async () => {
    try {
      const userMsg: ApiMessage = {
        role: "user",
        content: msg,
      };

      console.log("USER MSG", msg);

      msges.push(userMsg);
      // check for original length

      var JsonBodyToSend: UserApiMessagePrompt = {
        Username: username,
        Title: title,
        Contents: userMsg,
      };

      const apiMessage: ApiMessage = {
        role: "assistant",
        content: "",
      };

      msges.push(apiMessage);

      const response = await fetch("http://192.168.0.100:8080/send_message", {
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

      for await (const chunk of decodeStreamToJson(response.body)) {
        console.log("Chunk: ", chunk);

        setMsgCallback((msges) => {
          const lastMessageContents = msges[msges.length - 1];
          return [...msges.slice(0, -1), { ...lastMessageContents, content: lastMessageContents.content + chunk }];
        });
        msges[msges.length - 1].content += chunk;
      }
      //console.log(msges[msges.length - 1].content);
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
      "http://192.168.0.100:8080/retrieve_convo_titles",
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
