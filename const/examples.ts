import { Conversation, Message, SenderType } from "@/type";
import { Models } from "appwrite";

export const exampleConversations: Omit<Conversation, keyof Models.Document>[] =
  [
    {
      title: "Asking about someone's day.",
      description: "Learn about asking about someone's day in conversation",
    },
    {
      title: "Discussing favorite hobbies.",
      description: "Talk about hobbies and discover common interests",
    },
    {
      title: "Planning a weekend trip.",
      description: "Organize a trip and decide on activities",
    },
    {
      title: "Talking about recent movies.",
      description: "Share thoughts on the latest movies you've seen",
    },
    {
      title: "Discussing work projects.",
      description: "Share updates and feedback on current work projects",
    },
    {
      title: "Talking about favorite books.",
      description: "Discuss your favorite books and authors",
    },
    {
      title: "Planning a dinner party.",
      description: "Plan the menu and guest list for a dinner party",
    },
    {
      title: "Sharing travel experiences.",
      description: "Talk about past trips and travel experiences",
    },
    {
      title: "Discussing new technology.",
      description: "Share thoughts on the latest tech trends and gadgets",
    },
    {
      title: "Talking about fitness routines.",
      description: "Discuss workout routines and fitness goals",
    },
    {
      title: "Planning a surprise party.",
      description: "Organize a surprise party and coordinate details",
    },
    {
      title: "Discussing favorite TV shows.",
      description: "Talk about your favorite TV shows and series",
    },
    {
      title: "Sharing cooking recipes.",
      description: "Exchange your favorite recipes and cooking tips",
    },
    {
      title: "Talking about fashion trends.",
      description: "Discuss the latest fashion trends and styles",
    },
    {
      title: "Planning a road trip.",
      description: "Organize a road trip and discuss the route",
    },
    {
      title: "Discussing career goals.",
      description: "Share your career aspirations and plans",
    },
    {
      title: "Talking about music preferences.",
      description: "Discuss your favorite music genres and artists",
    },
    {
      title: "Planning a beach vacation.",
      description: "Organize a beach vacation and activities",
    },
    {
      title: "Sharing gardening tips.",
      description: "Exchange tips and advice on gardening",
    },
    {
      title: "Discussing favorite sports.",
      description: "Talk about your favorite sports and teams",
    },
    {
      title: "Planning a hiking trip.",
      description: "Organize a hiking trip and prepare the essentials",
    },
    {
      title: "Talking about pet care.",
      description: "Share tips and stories about taking care of pets",
    },
    {
      title: "Discussing home improvement projects.",
      description: "Share ideas and tips for home improvement",
    },
    {
      title: "Planning a picnic.",
      description: "Organize a picnic and decide on the location",
    },
    {
      title: "Talking about favorite podcasts.",
      description: "Discuss your favorite podcasts and episodes",
    },
    {
      title: "Sharing investment tips.",
      description: "Exchange advice on smart investments",
    },
    {
      title: "Discussing environmental issues.",
      description: "Talk about current environmental issues and solutions",
    },
    {
      title: "Planning a charity event.",
      description: "Organize a charity event and recruit volunteers",
    },
    {
      title: "Talking about personal development.",
      description: "Share personal development tips and resources",
    },
    {
      title: "Discussing travel plans.",
      description: "Share your upcoming travel plans and destinations",
    },
    {
      title: "Sharing photography tips.",
      description: "Exchange tips and advice on photography",
    },
  ];

export const exampleMessages: Omit<
  Message,
  keyof Models.Document | "conversationId"
>[] = [
  {
    textContent: "Hello! How can I assist you today?",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Hi! I need help with my project.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent: "Sure, what do you need help with?",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent:
      "I'm struggling with understanding how to use Retrofit in Android Studio.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent:
      "Retrofit is a type-safe HTTP client for Android and Java. How can I assist you with it?",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent:
      "Can you provide an example of how to create a Retrofit instance?",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent:
      "Certainly! Here's an example of how to create a Retrofit instance...",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Thanks! That really helps.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent: "You're welcome! Let me know if you need any more help.",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Can you explain how to handle API responses with Retrofit?",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent:
      "Of course! You can handle API responses by using callback methods. Would you like an example?",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Yes, please.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent: "Here’s an example of handling API responses with Retrofit...",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Got it. How do I handle errors in Retrofit?",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent:
      "You can handle errors using the `onFailure` callback method. Would you like a code snippet?",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Yes, that would be helpful.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent: "Here’s a code snippet to handle errors in Retrofit...",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "Thank you! This is really helpful.",
    sender: "Alice",
    senderType: SenderType.USER,
  },
  {
    textContent: "You're welcome! Feel free to ask if you have more questions.",
    sender: "ChatGPT",
    senderType: SenderType.BOT,
  },
  {
    textContent: "That's all for now. Thanks again!",
    sender: "Alice",
    senderType: SenderType.USER,
  },
];
