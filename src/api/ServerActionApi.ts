import axios from "axios";

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

export interface ApiMessageArrayResponse {
  Title: string;
  Messages: ApiMessage[];
}

export const LoadChatRequest = async (username: string, title: string): Promise<ApiMessageArrayResponse> => {
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

    const errorMsg: ApiMessageArrayResponse = {
      Title: "",
      Messages: [],
    };
    return errorMsg;
  }
};

export const HandleSendMessage = (msg: string, msges: ApiMessage[]) => {
  const handleClick = async () => {
    try {
      const userMsg : ApiMessage = {
        Role: "user",
        Content: msg
      }
      msges.push(userMsg);
      // check for original length
      const origLength = msges.length;
      const response = await fetch("http://localhost:8080/send_message", {
        method: "POST",
        body: JSON.stringify(msg),
        headers: {
          "Content-type": "application/json",
        },
      });

      // create the stream for the decoder to read from
      const reader = response.body?.getReader();
      const stream = new ReadableStream({
        async pull(controller) {
          const result = await reader?.read()
          if (result?.done) {
            controller.close();
            return;
          }
          controller.enqueue(result?.value);
        }
      });

      // consume the stream to invoke the callback to set the message
      const decoder = new TextDecoder();
      const streamReader = stream.getReader();
      let result;
      while ((result = await streamReader.read()) !== undefined) {
        if (result.done)
          break;
        // if no new message appended yet, append
        if (msges.length == origLength) {
          const apiMessage: ApiMessage = {
            Role: "assistant",
            Content: ""
          };
          msges.push(apiMessage);
          msges[origLength].Content += decoder.decode(result.value);
        }
        // else add on to the contents of the current message being generated
        else {
          msges[origLength].Content += decoder.decode(result.value);
        }
      } 
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  return handleClick;
};

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
