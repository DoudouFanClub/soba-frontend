import axios from "axios";

export const LoginRequest = async (
  username: string,
  password: string,
  convo: string[] = []
) => {
  console.log("Posting Login Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        username: { username },
        password: { password },
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

export const RegisterRequest = async (
  username: string,
  password: string,
  passwordConfirm: string,
  convo: string[] = []
) => {
  console.log("Posting Register Request");

  // Include a check here prior to publishing to see whether both passwords match
  // Display wrong password message here

  try {
    const response = await axios.post(
      "http://localhost:8080/register",
      {
        username: { username },
        password: { password },
        conversations: convo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    //setResponseData(response.data);
    // Check Response Data
    // Success: Change to conversation page
    // Failed: Display if username exist
  } catch (error) {
    console.error("Error:", error);
  }
};

export const NewChatRequest = async (
  username: string,
  title: string,
  model: string
) => {
  console.log("Attempting to post");
  try {
    const response = await axios.post(
      "http://localhost:8080/new_chat",
      {
        username: { username },
        title: { title },
        model: { model },
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
  } catch (error) {
    console.error("Error:", error);
  }
};

export const RenameChatRequest = async () => {
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

    //setResponseData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const LoadChatRequest = async () => {
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

    //setResponseData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DeleteChatRequest = async () => {
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

    //setResponseData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const UserQueryRequest = async () => {
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

    //setResponseData(response.data);
  } catch (error) {
    console.error("Error:", error);
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

    //setResponseData(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
