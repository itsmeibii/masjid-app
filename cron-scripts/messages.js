const fs = require('fs');
const path = require('path');

// Function to read chat log from a file and extract messages from today
function extractTodayMessages(filePath) {
  // Read the chat log from the file
  const chatLog = fs.readFileSync(filePath, 'utf-8');

  // Regular expression to match the date and time at the start of each message
  const messagePattern = /^\[\d{2}\/\d{2}\/\d{4},\s\d{1,2}:\d{2}:\d{2}\s[APM]{2}\]/;

  // Split the chat log into lines
  const lines = chatLog.split('\n');

  // Combine lines into messages
  const messages = [];
  let currentMessage = '';

  lines.forEach((line) => {
    if (messagePattern.test(line)) {
      if (currentMessage) {
        messages.push(currentMessage.trim());
      }
      currentMessage = line;
    } else {
      currentMessage += '\n' + line;
    }
  });

  // Add the last message
  if (currentMessage) {
    messages.push(currentMessage.trim());
  }

  // Get today's date as a string in the format YYYY-MM-DD
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Filter messages to find those from today
  const todayMessages = messages.filter((message) => {
    const dateMatch = message.match(/^\[(\d{2}\/\d{2}\/\d{4}),\s\d{1,2}:\d{2}:\d{2}\s[APM]{2}\]/);
    if (dateMatch) {
      const messageDate = new Date(dateMatch[1].split('/').reverse().join('-'));
      return messageDate.toISOString().split('T')[0] === todayString;
    }
    return false;
  });

  return todayMessages;
}

// Example usage
const filePath = path.join(__dirname, 'chat_log.txt');
const todayMessages = extractTodayMessages(filePath);

console.log("Today's Messages:\n", todayMessages.join('\n\n'));
