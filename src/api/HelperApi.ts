import axios, { AxiosResponse } from "axios";

// For Single String Response
export interface ApiResponse {
  response: string;
}

// Utility function for making API calls
export const makeSimplePostRequest = async (url: string, data: object): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.post<ApiResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(`Error while making POST request to ${url}:`, error);
    throw error;
  }
};
