import axios from "axios";

export interface ApiResponse {
  response: string;
}

export const LoginRequest = async (username: string, password: string, convo: string[] = []): Promise<ApiResponse> => {
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
    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errorMsg: ApiResponse = {
      response: "error",
    };
    return errorMsg;
  }
};

export const LogoutRequest = async (username: string) => {
  console.log("Sending POST Logout Request");
  try {
    const response = await axios.post(
      "http://localhost:8080/logout",
      {
        username: username,
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
