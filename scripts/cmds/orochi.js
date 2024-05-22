 const axios = require('axios');

const Prefixes = [
  'Odd',
  'snow',
  'bot',
  'snow hy',
  'ØđɨȺmᵾs Łønøn',
];

module.exports = {
  config: {
    name: 'orochi',
    aliases: [`chi`],
    version: '2.0',
    author: 'Aryan Chauhan',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an Orochi for an answer.',
    },
    longDescription: {
      en: 'Asks an Orochi for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p)); 

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "ØđɨȺmᵾs Łønøn💝 \n\nYo how can I help you today ?."
        );
        return;
      }
      const response = await axios.get(`http://ai-technology.onrender.com/api/orochiai?prompt=${encodeURIComponent(prompt)}&key=sk-aryan-op`);


      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.fullResponse

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `ØđɨȺmᵾs Łønøn💝 \n\n${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the 𝙧
        server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
}
