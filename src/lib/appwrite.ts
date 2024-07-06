import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
