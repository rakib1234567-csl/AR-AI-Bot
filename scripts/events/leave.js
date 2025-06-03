module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Rakib Boss",
  description: "Sends a custom leave message when someone leaves the group"
};

module.exports.run = async ({ event, api, Users, Threads }) => {
  const moment = require("moment-timezone");
  const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");
  const threadInfo = await api.getThreadInfo(event.threadID);
  const groupName = threadInfo.threadName;
  const userName = await Users.getNameUser(event.leftParticipantFbId);

  const msg = `‎╭•┄┅══❁👹❁══┅┄•╮
❁═🌻${groupName}🌻═❁
╰•┄┅══❁👹❁══┅┄•╯

⚜️ ${userName} ⚜️

●▬๑۩ বউত বন্ডামি করিয়া থাকছো, আর থাকার দরকার নায়✨✨ 

🥵👉🏻  ${userName}  👈🏻🥵
☝️🦵সয়তানরে লাত্তি দিয়া বার কর 🦵🖕

●▬๑۩ তুমরার জানা মতে ইগু ভালা না বাদ আছিল, কইয়া জাউ🤔🤔


‎╭•┄┅══❁🌺❁══┅┄•╮
 🌹 -Made by RAKIB-🌹
╰•┄┅══❁🌺❁══┅┄•╯

❁═❁🌻AR BOT🌻❁═❁
😥...Good 𝙉𝙞𝙜𝙝𝙩 || ${time}`;

  // Send message
  return api.sendMessage(msg, event.threadID);
};
