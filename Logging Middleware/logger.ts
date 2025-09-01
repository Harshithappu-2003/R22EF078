import axios from 'axios';

export const Log = async (
  stack: string,
  level: string,
  packageName: string,
  message: string,
  accessToken: string
) => {
  const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
  const logData = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    const response = await axios.post(LOG_API_URL, logData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log("Log sent successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to send log:", error.response?.data || error.message);
      throw new Error(`Logging failed: ${JSON.stringify(error.response?.data)}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred during logging.");
    }
  }
};