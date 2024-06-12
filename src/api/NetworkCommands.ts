import axios from "axios";

/**
 * Might want to shift these interface response out of this file
 */
export interface ApiResponse {
  response: string;
}

export interface ApiUserTitlesResponse {
  response: string[];
}

export const LoginRequest = async (
  username: string,
  password: string,
  convo: string[] = []
) => {
  console.log("Sending POST Login Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        username: username,
        password: password,
        conversations: convo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // setResponseData(response.data);
    // Check Response Data
    // Success: Handle by changing the View to the Conversation Page
    // Fail: Display "Wrong Password" message and re-prompt
  } catch (error) {
    console.error("Error:", error);
  }
};

export const LogoutRequest = async (username: string, title: string) => {
  console.log("Sending POST Logout Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
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

    // Double check if successfully logout
    // Change view to login page
  } catch (error) {
    console.error("Error:", error);
  }
};

export const RegisterRequest = async (
  username: string,
  password: string,
  convo: string[] = []
): Promise<ApiResponse> => {
  console.log("Sending POST Register Request");

  // Include a check here prior to publishing to see whether both passwords match
  // Display wrong password message here

  try {
    const response = await axios.post(
      "http://localhost:8080/register",
      {
        username: username,
        password: password,
        conversations: convo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;

    // Check Response Data
    // Success: Change to conversation page
    // Failed: Display if username exist
  } catch (error) {
    console.error("Error:", error);

    const errResponse: ApiResponse = {
      response: "error",
    };

    return errResponse;
  }
};

export const NewChatRequest = async (
  username: string,
  title: string,
  model: string
) => {
  console.log("Sending POST New Chat Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/new_chat",
      {
        username: username,
        title: title,
        model: model,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    // Check response data
    // Success: Send request to add and load the empty convo
    // Fail: Display whether its because there is already a chat with the same title
    // Empty title
    // Title too long
  } catch (error) {
    console.error("Error:", error);
  }
};

export const RenameChatRequest = async (
  username: string,
  currTitle: string,
  newTitle: string
) => {
  console.log("Sending POST Rename Chat Request");

  // Check currTitle to make sure we can change (diff Title)

  try {
    const response = await axios.post(
      "http://localhost:8080/rename_chat",
      {
        username: username,
        title: newTitle,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    // Success: Re-Apply chat name on Chats View
    // Fail: Check if same title / empty title / too long
  } catch (error) {
    console.error("Error:", error);
  }
};

export const LoadChatRequest = async (username: string, title: string) => {
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

    // Take response.data and filter it into a TextBlock (string[])
    // and return it to render
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DeleteChatRequest = async (username: string, title: string) => {
  console.log("Sending POST Delete Chat Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/delete_chat",
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

    // Success: Check if deleted chat is currently loaded - Change to clean view
    //          Else - Just update Chat Display section
    // Fail: See if cannot find convo to remove
  } catch (error) {
    console.error("Error:", error);
  }
};

export const UserQueryRequest = async (
  username: string,
  title: string,
  content: string
) => {
  console.log("Sending POST User Query Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/user_query",
      {
        username: username,
        title: title,
        content: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    // Keep reading from response.data for the most updated response
    // until Backend sends a completed response
    // We need to create a json struct format to retrieve prompts back w/ status
  } catch (error) {
    console.error("Error:", error);
  }
};

export const RetrieveConversationTitlesRequest = async (
  username: string
): Promise<ApiUserTitlesResponse> => {
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

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errResponse: ApiUserTitlesResponse = {
      response: [],
    };

    return errResponse;
  }
};

export const TestingPostRequest = async () => {
  console.log("Attempting to post");
  try {
    const response = await axios.post(
      "http://localhost:8080/testpost",
      {
        text: "HELLO FROM FRONTEND",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    //
  } catch (error) {
    console.error("Error:", error);
  }
};
