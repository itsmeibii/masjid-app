const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Import other required modules
const { whatsappnames } = require('./extract-file');
const serviceAccount = require('../serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

//request from chat


// Function to get the image directory and collection name for a given index
const imageDir = (index) => `/Users/itsmeibi/Desktop/school yeah/chat-logs/${whatsappnames[index][1]}_extrc-${new Date().toLocaleDateString().split("/").join("-")}`;
const collectionName = (index) => `images${whatsappnames[index][1]}`;


// Function to read chat log from a file and extract messages from today
function extractTodayMessages(filePath) {
  const chatLog = fs.readFileSync(filePath, 'utf-8');
  const messagePattern = /^\[\d{2}\/\d{2}\/\d{4},\s\d{1,2}:\d{2}:\d{2}\s[APM]{2}\]/;
  const lines = chatLog.split('\n');
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


  if (currentMessage) {
    messages.push(currentMessage.trim());
  }


  const today = new Date();
  const todayString = today.toISOString().split('T')[0];


  return messages.filter((message) => {
    const dateMatch = message.match(/^\[(\d{2}\/\d{2}\/\d{4}),\s\d{1,2}:\d{2}:\d{2}\s[APM]{2}\]/);
    if (dateMatch) {
      const messageDate = new Date(dateMatch[1].split('/').reverse().join('-'));
      return messageDate.toISOString().split('T')[0] === todayString;
    }
    return false;
  });
}


// Function to get the next index for a given collection
async function getNextIndex(collection) {
  const snapshot = await db.collection(collection).orderBy('index', 'desc').limit(1).get();
  if (snapshot.empty) {
    return 0;
  } else {
    return snapshot.docs[0].data().index + 1;
  }
}


// Function to store a file name in Firestore with a given index
async function storeFileName(collection, fileName, index) {
  const docRef = db.collection(collection).doc(index.toString());
  await docRef.set({ index, fileName });
  console.log(`Stored in Firestore: ${fileName} with index ${index}`);
}


// Function to check if a file name exists in Firestore for a given collection
async function fileNameExists(collection, fileName) {
  const snapshot = await db.collection(collection).where('fileName', '==', fileName).get();
  return !snapshot.empty;
}


// Function to process new jpg files for a given index
async function processNewFiles(index) {
  try {
    const dir = imageDir(index);
    const collection = collectionName(index);
    fs.readdir(dir, async (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      const jpgFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');
      let currentIndex = await getNextIndex(collection);

      for (const file of jpgFiles) {
        const fileNameWithoutExt = path.basename(file, '.jpg');
        const exists = await fileNameExists(collection, fileNameWithoutExt);

        if (!exists) {
          await storeFileName(collection, fileNameWithoutExt, currentIndex);
          currentIndex++;
        } else {
          console.log(`Already exists in Firestore: ${fileNameWithoutExt}`);
        }
      }
    });

} catch (e) {
    console.error(e);
  }
}


// Main loop to process each chat log and images
async function main() {
  const date = new Date().toLocaleDateString().split("/").join("-");
  const messages = {};


  for (let i = 0; i < whatsappnames.length; ++i) {
    const filePath = `/Users/itsmeibi/Desktop/school yeah/chat-logs/${whatsappnames[i][1]}_extrc-${date}/_chat.txt`;
    messages[whatsappnames[i][1]] = extractTodayMessages(filePath);


    await processNewFiles(i);
    //now for the chatgpt part

  }


  console.log('All processing complete.');
}


// Run the main function
// let checkIfEvent = (string) => {
//   let checkArray = ['No Events Today', 'No Events Scheduled', 'No Events Organized'];
//   for (let i = 0; i < checkArray.length; i++) {
//     if (string.toLowerCase().includes(checkArray[i].toLowerCase())) {
//       return false;
//     }
//   }
//   return true;
// }



