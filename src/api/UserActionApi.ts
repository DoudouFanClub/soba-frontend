import { ApiResponse, makeSimplePostRequest } from "./HelperApi";

/**
 * Handles the NewChat Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to create a New Entry of a Conversation
 * and link it to the User
 * @param username
 * @param title
 * @returns
 */
export const NewChatRequest = async (username: string, title: string, currTitle: string): Promise<ApiResponse> => {
  console.log("Sending POST New Chat Request");
  try {
    const response = await makeSimplePostRequest("http://localhost:8080/new_chat", { username: username, title: title, prevtitle: currTitle });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    var serverResponse: ApiResponse = {
      response: "error",
    };
    return serverResponse;
  }
};

/**
 * (INCOMPLETE)
 * Handles the RenameChat Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to Rename an existing Conversation as
 * well as the Title stored within the associated User
 * @param username
 * @param currTitle
 * @param newTitle
 */
export const RenameChatRequest = async (username: string, currTitle: string, newTitle: string) => {
  console.log("Sending POST Rename Chat Request");

  // Check currTitle to make sure we can change (diff Title)

  try {
    const response = await makeSimplePostRequest("http://localhost:8080/rename_chat", { username: username, title: newTitle });
    console.log(response);

    // Success: Re-Apply chat name on Chats View
    // Fail: Check if same title / empty title / too long
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 * Handles the DeleteChat Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to Delete an existing Conversation as
 * well as the Title stored wthin the associated User
 * @param username
 * @param title
 */
export const DeleteChatRequest = async (username: string, title: string) => {
  console.log("Sending POST Delete Chat Request");
  try {
    const response = await makeSimplePostRequest("http://localhost:8080/delete_chat", { username: username, title: title });
    console.log(response);

    // Success: Check if deleted chat is currently loaded - Change to clean view
    //          Else - Just update Chat Display section
    // Fail: See if cannot find convo to remove
  } catch (error) {
    console.error("Error:", error);
  }
};
