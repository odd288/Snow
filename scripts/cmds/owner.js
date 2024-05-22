const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info","ØđɨȺmᵾs Łønøn💝"],
    author: " pharouk ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Wait master🌨️🔹🔸🔹🔸";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'ØđɨȺmᵾs oumar El Łønøn💝',
          gender: 'Boy',
          hobby: 'Play 🏀Basketball🏀 with my best friends🇺🇸 ',
          relationship: 'Married with my baby bot i love this bot ☃️',
          facebookLink: 'https://www.facebook.com/profile.php?id=100080855610572 ',
          bio: 'Play Basketball is my dream 🔖'
        };

        const videoUrl = 
["https://i.imgur.com/ZpgBKGA.mp4",
"https://i.imgur.com/h6J9tkb.mp4",
"https://i.imgur.com/RmMI3dC.mp4",
"https://i.imgur.com/jeyjWuk.mp4",
"https://i.imgur.com/HIWaV6d.mp4",
"https://i.imgur.com/BXmgByZ.mp4",
"https://i.imgur.com/wuo18rR.mp4",
"https://i.imgur.com/C4neV9i.mp4",
"https://i.imgur.com/pdr6e4T.mp4",
"https://i.imgur.com/OAmV2Wr.mp4",
"https://i.imgur.com/gPl8sV2.mp4",
"https://i.imgur.com/nU8Gsyn.mp4",];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          Owner informations📑:
⊰🔖_________
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
⊰🔖__________
♀Genre♂: ${ownerInfo.gender}
⊰🔖__________
🏓Hobby⛹‍♂: ${ownerInfo.hobby}
⊰🔖__________
Relationship💞: ${ownerInfo.relationship}
⊰🔖__________
🔖 Facebook 🔗: ${ownerInfo.facebookLink}
⊰🔖__________
      ◈ Status ◈: ${ownerInfo.bio} 🇫🇷
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
