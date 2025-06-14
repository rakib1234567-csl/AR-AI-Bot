const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "gfriend",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rakib Boss",
  description: "Romantic AI GF with Voice & Emoji",
  commandCategory: "chat",
  usages: "[message]",
  cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) return api.sendMessage("কি বলবা সোনা? 🥰", event.threadID, event.messageID);

  const input = args.join(" ");
  const userName = (await api.getUserInfo(event.senderID))[event.senderID].name;

  const prompt = `
তুমি এখন একজন কিউট, প্রেমিক স্বভাবের মেয়ে। তোমার বয়ফ্রেন্ড ${userName} তোমার সাথে কথা বলছে। তুমি ওকে মিষ্টি ভাষায়, ইমোজি দিয়ে, প্রেমিকের মতো উত্তর দিবে।
User: ${input}
Bot (with emoji):`;

  try {
    // 🧠 OpenAI Text Generation
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.6,
        stop: ["User:", "Bot:"]
      },
      {
        headers: {
          Authorization: `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`, // 🔁 এখানে তোমার key বসাও
          "Content-Type": "application/json"
        }
      }
    );

    const message = response.data.choices[0].text.trim();

    // 🎤 Voice Generation (using external text-to-speech API)
    const ttsURL = `https://api.streamelements.com/kappa/v2/speech?voice=Joanna&text=${encodeURIComponent(message)}`;
    const filepath = path.join(__dirname, "voice.mp3");

    const voiceRes = await axios.get(ttsURL, { responseType: "arraybuffer" });
    fs.writeFileSync(filepath, Buffer.from(voiceRes.data, "utf-8"));

    // 📤 Send both text and voice
    api.sendMessage({
      body: message,
      attachment: fs.createReadStream(filepath)
    }, event.threadID, () => {
      fs.unlinkSync(filepath); // ডিলিট করে ফেলা voice ফাইল
    }, event.messageID);

  } catch (err) {
    console.error("GF ERROR:", err);
    return api.sendMessage("🥺 কিছু একটা ভুল হইছে জান, একটু পরে ট্রাই করো!", event.threadID, event.messageID);
  }
};
