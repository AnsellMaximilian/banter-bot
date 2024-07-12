import { Client, Account, Databases } from "appwrite";

export const config = {
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
};

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(config.projectId);

export const account = new Account(client);

export const databases = new Databases(client);
