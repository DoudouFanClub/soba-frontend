import { ApiResponse, makeSimplePostRequest } from "./HelperApi";

/**
 * Handles the Login Request using REST API to communicate with
 * the Backend Server
 * @param username
 * @param password
 * @param convo
 * @returns
 */
export const LoginRequest = async (username: string, password: string, convo: string[] = []): Promise<ApiResponse> => {
  console.log("Sending POST Login Request");

  try {
    const response = await makeSimplePostRequest("http://192.168.0.100:8080/login", {
      username: username,
      password: password,
      conversations: convo,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errorMsg: ApiResponse = {
      response: "error",
    };
    return errorMsg;
  }
};

/**
 * Handles the Logout Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to Save the current chat
 * @param username
 * @param title
 */
export const LogoutRequest = async (username: string, title: string) => {
  console.log("Sending POST Logout Request");
  try {
    const response = await makeSimplePostRequest("http://192.168.0.100:8080/logout", {
      username: username,
      title: title,
    });
    console.log(response.data);

    // Double check if successfully logout
    // Change view to login page
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 * Handles the Registration Request using REST API to communicate with
 * the Backend Server
 * Prompts the Backend Server to save the User's Details
 * @param username
 * @param password
 * @param convo
 * @returns
 */
export const RegisterRequest = async (username: string, password: string, convo: string[] = []): Promise<ApiResponse> => {
  console.log("Sending POST Register Request");
  try {
    const response = await makeSimplePostRequest("http://192.168.0.100:8080/register", {
      username: username,
      password: password,
      conversations: convo,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errResponse: ApiResponse = {
      response: "error",
    };

    return errResponse;
  }
};
