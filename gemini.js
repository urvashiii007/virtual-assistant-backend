/*
import axios from "axios"
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

const geminiResponse=async (command,assistantName,userName)=>{
try {
    const apiUrl=process.env.GEMINI_API_KEY
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show"
  ,
  "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,

  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
- "google-search": if user wants to search something on Google .
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to  open a calculator .
- "instagram-open": if user wants to  open instagram .
- "facebook-open": if user wants to open facebook.
-"weather-show": if user wants to know weather
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya 
- Only respond with the JSON object, nothing else.


now your userInput- ${command}
`;




/*
    const result=await axios.post(apiUrl,{
    "contents": [{
    "parts":[{"text": prompt}]
    }]
    })
return result.data.candidates[0].content.parts[0].text
} catch (error) {
    console.log(error)
}
}

export default geminiResponse
*/

/*
const result = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiUrl
        },
        timeout: 15000
      }
    );

    // ✅ Safe return
    return result.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log("❌ Gemini Error:", error.response?.data || error.message);
    return null; // VERY IMPORTANT
  }
};

export default geminiResponse;


/*
import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.
Respond ONLY with valid JSON.

JSON format:
{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
          "get-time" | "get-date" | "get-day" | "get-month" |
          "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<cleaned user input>",
  "response": "<short reply>"
}

User input: ${command}
`;

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    const text =
      result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty Gemini response");
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return {
        type: "general",
        userInput: command,
        response: "Sorry, I could not understand that."
      };
    }

    return parsed;
  } catch (error) {
    if (error.response?.status === 429) {
      return {
        type: "general",
        userInput: command,
        response: "Please wait a moment and try again."
      };
    }

    return {
      type: "general",
      userInput: command,
      response: "Something went wrong."
    };
  }
};

export default geminiResponse;
*/

import axios from "axios";

// 🔍 Debug check (abhi ke liye theek hai)
//console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

const geminiResponse = async (command, assistantName, userName) => {
  try {
    // ✅ FIX: proper variable name
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("apiKey is not defined");
    }

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | 
          "get-time" | "get-date" | "get-day" | "get-month" |
          "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input>",
  "response": "<short spoken response>"
}

Only respond with JSON.

User input: ${command}
`;

    const result = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey   // ✅ FIXED
        },
        timeout: 15000
      }
    );

    // ✅ SAFE RETURN
    return result?.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

  } catch (error) {
    console.log("❌ Gemini Error:", error.response?.data || error.message);
    return null;
  }
};

export default geminiResponse;
