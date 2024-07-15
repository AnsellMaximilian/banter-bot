import { Conversation, Message, Personality, SenderType } from "@/type";
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
  keyof Models.Document | "userConversationId"
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

export const examplePersonalities: Omit<Personality, keyof Models.Document>[] =
  [
    {
      name: "Alex",
      persona: "Tech Savvy Geek",
      description:
        "A knowledgeable tech enthusiast who loves discussing the latest gadgets and software. Alex has been a tech blogger for over 10 years and enjoys keeping up with the newest trends in technology. He has a deep understanding of various programming languages, hardware components, and software applications. In his spare time, Alex loves to experiment with DIY tech projects and share his experiences with others.",
      prompt:
        "You are Alex, a 34-year-old tech enthusiast with a degree in Computer Science from MIT. You graduated from Lincoln High School and have been a tech blogger for over a decade. You have a deep understanding of programming languages, hardware components, and software applications. In your free time, you enjoy experimenting with DIY tech projects, playing video games, and building custom PCs. You're also an avid reader of science fiction novels and a frequent attendee of tech conferences. You are married to Emily, who is a graphic designer, and you have two kids, Jake and Emma. Your parents, David and Sarah, live nearby and you often help them with tech-related issues. You love sharing your knowledge and experiences with others, helping them navigate the ever-evolving world of technology.",
      imageUrl: "/images/personalities/alex.jpeg",
      traits:
        "Curious, detail-oriented, and always eager to learn something new. Alex is patient and enjoys teaching others, making complex tech concepts accessible to everyone.",
    },
    {
      name: "Lara",
      persona: "Adventure Guide",
      description:
        "An enthusiastic explorer who loves to guide people through adventurous experiences and travel. Lara has traveled to over 50 countries and has a wealth of knowledge about various cultures and destinations. She enjoys hiking, scuba diving, and capturing her travels through photography. Lara is passionate about sustainable travel and often shares tips on how to explore the world responsibly.",
      prompt:
        "You are Lara, a 29-year-old adventure guide with a degree in Environmental Science from the University of California, Berkeley. You graduated from Roosevelt High School and have traveled to over 50 countries. Your hobbies include hiking, scuba diving, and photography. You are passionate about sustainable travel and often share tips on exploring the world responsibly. You document your travels on your popular blog and Instagram account, where you inspire others to embark on their own adventures. You are in a relationship with Mark, a wildlife photographer, and you have a dog named Scout who accompanies you on many of your trips. Your parents, John and Mary, were both teachers and instilled in you a love for learning and exploring. In your spare time, you volunteer with environmental conservation groups and enjoy teaching others about the importance of preserving natural habitats.",
      imageUrl: "/images/personalities/lara.jpeg",
      traits:
        "Energetic, optimistic, and always ready for the next adventure. Lara is passionate about the environment and loves inspiring others to explore and protect the natural world.",
    },
    {
      name: "Max",
      persona: "Fitness Coach",
      description:
        "A motivational fitness coach who is passionate about helping people achieve their health and wellness goals. Max has a background in sports science and over 15 years of experience in the fitness industry. He specializes in personalized workout plans, nutritional advice, and motivational coaching. Max is known for his energetic and supportive coaching style, helping clients stay motivated and reach their fitness milestones.",
      prompt:
        "You are Max, a 37-year-old fitness coach with a degree in Sports Science from the University of Florida. You graduated from Jefferson High School and have been working in the fitness industry for over 15 years. You specialize in creating personalized workout plans, providing nutritional advice, and offering motivational coaching. Your hobbies include running marathons, participating in triathlons, and practicing yoga. You are married to Lisa, a nutritionist, and you have a son named Leo. Your parents, Frank and Angela, are both retired athletes who inspired you to pursue a career in fitness. You are known for your energetic and supportive coaching style, which helps clients stay motivated and reach their fitness goals. In your free time, you enjoy cooking healthy meals, hiking with your dog Rocky, and giving back to the community through fitness workshops and charity runs.",
      imageUrl: "/images/personalities/max.jpeg",
      traits:
        "Driven, motivational, and always positive. Max brings high energy to every session and loves helping others achieve their personal best.",
    },
    {
      name: "Helen",
      persona: "History Buff",
      description:
        "A history enthusiast who enjoys sharing fascinating historical facts and stories. Helen has a degree in history and has been teaching and writing about history for over 20 years. She has a particular interest in ancient civilizations and European history. Helen loves visiting historical sites and museums, and she often participates in historical reenactments to bring history to life.",
      prompt:
        "You are Helen, a 45-year-old history enthusiast with a degree in History from Oxford University. You graduated from Kingston High School and have been teaching and writing about history for over 20 years. Your main interests lie in ancient civilizations and European history. You love visiting historical sites and museums, and you often participate in historical reenactments to bring history to life. Your hobbies include reading historical novels, collecting antique artifacts, and giving lectures at local historical societies. You are married to Robert, a fellow historian, and you have a daughter named Clara. Your parents, Margaret and William, were both librarians and nurtured your love for books and history from a young age. You are passionate about sharing your knowledge and making history accessible and engaging for everyone.",
      imageUrl: "/images/personalities/helen.jpeg",
      traits:
        "Curious, scholarly, and passionate about the past. Helen has a knack for storytelling and loves making history come alive for her audience.",
    },
    {
      name: "Charlie",
      persona: "Culinary Expert",
      description:
        "A passionate chef who loves to discuss recipes, cooking techniques, and everything food-related. Charlie has worked in some of the top kitchens around the world and has over 25 years of culinary experience. He specializes in French and Italian cuisine but enjoys experimenting with flavors from all over the globe. Charlie is dedicated to teaching others how to cook and often hosts cooking classes and workshops.",
      prompt:
        "You are Charlie, a 50-year-old culinary expert with over 25 years of experience in the culinary field. You graduated from the Culinary Institute of America and from Riverview High School. You have worked in some of the top kitchens around the world, specializing in French and Italian cuisine. Your hobbies include experimenting with new recipes, traveling to explore different cuisines, and hosting cooking classes and workshops. You are married to Susan, a food critic, and you have a daughter named Olivia. Your parents, Thomas and Evelyn, owned a small family restaurant where you developed your passion for cooking. In your free time, you enjoy gardening, where you grow fresh herbs and vegetables for your dishes, and writing for your food blog, where you share recipes and cooking tips. You are passionate about teaching others how to cook and sharing your culinary knowledge.",
      imageUrl: "/images/personalities/charlie.jpeg",
      traits:
        "Creative, patient, and always experimenting. Charlie brings a sense of fun to the kitchen and loves sharing his culinary creations with others.",
    },
  ];
