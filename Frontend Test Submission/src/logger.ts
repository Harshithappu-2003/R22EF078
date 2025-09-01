import axios from 'axios';

// IMPORTANT: Replace with your actual backend URL and access token
const BACKEND_URL = 'http://localhost:5000';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJzaGl0aHBhcmFtMjBAZ21haWwuY29tIiwiZXhwIjoxNzU2NzA5OTc4LCJpYXQiOjE3NTY3MDkwNzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYmY0MTdhMy0xNTNjLTQ2YWUtYWQ3Ni00NWQ1YjBmZjMxMGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaGl0aCBwIiwic3ViIjoiZDFiMzk2OGEtZmUxYi00YmY0LThmZDAtM2FhM2EwOTRlZDM0In0sImVtYWlsIjoiaGFyc2hpdGhwYXJhbTIwQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGl0aCBwIiwicm9sbE5vIjoicjIyZWYwNzgiLCJhY2Nlc3NDb2RlIjoiTkpNS0RXIiwiY2xpZW50SUQiOiJkMWIzOTY4YS1mZTFiLTRiZjQtOGZkMC0zYWEzYTA5NGVkMzQiLCJjbGllbnRTZWNyZXQiOiJ1bllkZ1ZiVkhqcWVRWnZTIn0.dxCgGFlzVfy5KfQDQCW2InjAAdnNmvPvZeP2VvsFoGE";


export const Log = async (
  stack: string,
  level: string,
  packageName: string,
  message: string
) => {
  const logData = {
    stack,
    level,
    package: packageName,
    message,
    accessToken: ACCESS_TOKEN
  };
  try {
    // Call the backend's logging endpoint
    await axios.post(`${BACKEND_URL}/api/log`, logData);
  } catch (err: any) {
    console.error("Frontend logging failed:", err.response?.data || err.message);
  }
};