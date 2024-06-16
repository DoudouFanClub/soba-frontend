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
