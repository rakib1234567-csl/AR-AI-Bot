module.exports.config = {
  name: "leavenoti",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Rakib Boss",
  description: "Custom leave message with proper user name"
};

module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");

  const threadInfo = await api.getThreadInfo(event.threadID);
  const groupName = threadInfo.threadName;

  let name = "একজন গোপন সদস্য";
  try {
    const info = await api.getUserInfo(event.leftParticipantFbId);
    name = info[event.leftParticipantFbId].name || name;
  } catch (e) {
    console.log("❌ ইউজার নাম পাওয়া যায়নি:", e);
  }

  const msg = `‎╭•┄┅══❁👹❁══┅┄•╮
❁═🌻${groupName}🌻═❁
╰•┄┅══❁👹❁══┅┄•╯

⚜️ ${name} ⚜️

●▬๑۩ বউত বন্ডামি করিয়া থাকছো, আর থাকার দরকার নায়✨✨ 

👉🏻  ${name}  👈🏻
☝️🦵সয়তানরে লাত্তি দিয়া বার কর 🦵🖕

●▬๑۩ তুমরার জানা মতে ইগু ভালা না বাদ আছিল, কইয়া জাউ🤔🤔


‎╭•┄┅══❁🌺❁══┅┄•╮
 🌹 -Made by RAKIB-🌹
╰•┄┅══❁🌺❁══┅┄•╯

❁═❁🌻AR BOT🌻❁═❁
😥...Good Byee || ${time}`;

  return api.sendMessage(msg, event.threadID);
};
