import axios from "axios";

export const NewChatRequest = async (username: string, title: string): Promise<string> => {
  console.log("Sending POST New Chat Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/new_chat",
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
  } catch (error) {
    console.error("Error:", error);
    return "failure";
  }
};

export const RenameChatRequest = async (username: string, currTitle: string, newTitle: string) => {
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

export const UserQueryRequest = async (username: string, title: string, content: string) => {
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
