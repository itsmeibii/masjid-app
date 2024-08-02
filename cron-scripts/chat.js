 const OpenAI = require('openai');
const chat = new OpenAI({
    apiKey: process.env.CHATKEY
});
//

let message = 'The family has arranged a Dua and Quran Khani on Tuesday, July 23, 2024 for Brothers & Sisters.\n' +
    'Program starts after Asr. \n' +
    'Asr Salat @ 7.00 pm. Special Dua before Maghreb Salat at Suwanee Masjid located at 80 Celebration Drive, Suwanee, GA 30024.\n' +
    'Dinner Box will be served. Wasallam,  جزاكم الله خيراً\n' +
    '‎[22/07/2024, 11:45:53 AM] Khalid Teli: ‎image omitted\n' +
    '‎[25/07/2024, 11:55:51 AM] Khalid Teli: ‎image omitted\n' +
    '[26/07/2024, 7:02:24 AM] Khalid Teli: Assalamu Alaikum,\n' +
    '\n' +
    'انا لله وانا إليه راجعون \n' +
    'Br. Abdul Rahim Aliya passed away. His Janazah Salah will take place on Friday, July 26, 2024 after 2nd Jummah Salat at 3:00 pm at  Gwinnett Islamic Circle (GIC) Suwanee Masjid located at 80 Celebration Drive, Suwanee, GA 30024. \n' +
    '\n' +
    'Burial at New Muslim Cemetery located at \n' +
    '2245 Berry Hall Rd, SE, Bethlehem, GA 30620.\n' +
    '\n' +
    'Wasallam, جزاكم الله خيراً\n' +
    '[28/07/2024, 1:40:42 AM] Khalid Teli: السلام علیکم و رحمة الله و بركاته، \n' +
    '\n' +
    'Dear respected community members, \n' +
    'Please attend a special halaqah conducted by the visiting scholars from Raiwind, Pakistan tonight, Sunday, 07/28/2024, right after magrib salah.\n' +
    '\n' +
    '*Location: Gwinnett Islamic Circle (GIC) Suwanee Masjid,  80 Celebration Dr, \n' +
    'Suwanee, GA 30024\n' +
    'Time: Magrib Salah 8:43pm*\n' +
    '[28/07/2024, 3:25:07 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Group members have changed. Click to view.\n' +
    '‎[29/07/2024, 12:27:00 PM] Khalid Teli: ‎<attached: 00000002-PHOTO-2024-07-29-12-27-00.jpg>\n' +
    '‎[30/07/2024, 12:56:04 PM] Khalid Teli: ‎<attached: 00000003-PHOTO-2024-07-30-12-56-04.jpg>\n' +
    '[28/07/2024, 3:25:05 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:05 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:05 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:05 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:17 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:17 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[28/07/2024, 3:25:17 PM] Gwinnett Islamic Circle (GIC)Suwanee Masjid : ‎Use WhatsApp on your primary phone to see older replies.\n' +
    '[14/05/2024, 7:05:55 PM] ~ Rafi Syed: Assalam Alaikum. Thank you, brother, an excellent idea for keeping all of us informed.  Appreciate as always your hard work. ZAK\n' +
    '[16/05/2024, 11:55:41 AM] ~ Tanvirul Islam: Assalamualaikum.  What category should we use to make payment?\n' +
    '[21/05/2024, 1:55:01 PM] ~ Rafiq Hashwani: Left us tonight or last night?\n' +
    '[21/05/2024, 9:36:35 PM] ~ ZNG: Last night\n' +
    '[22/05/2024, 7:52:43 AM] ~ Fatou: 🙏🏿\n' +
    '[31/05/2024, 9:35:39 AM] ~ Saulat Rehan: As Salam Ailekum, request for duas in Friday prayers:\n' +
    'My mother will be under going surgery for breast cancer next week, may Allah grant her complete shifa and eliminate this disease from her body ao it wouldn’t reoccur. May Allah give her strength to overcome this painful procedure. Ameen\n' +
    '[31/05/2024, 4:46:15 PM] ~ Sanaa: What time? We are new to the area.\n' +
    '[31/05/2024, 9:59:05 PM] ~ Yusuf Faisthalab: May Allah grant him Jamaat\n' +
    '[07/06/2024, 5:05:18 PM] ~ Hamid Osmani: Inna lillahey wa inna lillahey rajoun\n'
async function requestchat(message, max_tokens = 500) {

    let data = await chat.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            { role: "system", content: "You are a chat analyst tasked with analyzing whatsapp chats and determining if they plan events." +
                    "If an event is planned in the chat logs provided, I need the name of the event; the date it is being planned in the form DAYOFWEEK, DD MMM, YYYY;" +
                    " the time it started in the form HH:MM AM/PM - HH:MM AM/PM, or HH:MM AM/PM if no end time is specified: For example, if you detected that an event starts at 7pm and ends at 9pm, return 7:00 PM - 9:00 PM. If you detected that an event started at 10AM but dont detect an end time, just return 10:00 AM;" +
                    " and the location, which you can format as the name of the venue, followed by the address, or just put either or if one is not specified. Finally, if extra info is provided and detected, add an 'extra info' section" +
                    "If no events are planned in the logs, please return 'No Events Planned'. If multiple are planned, return their summaries in the format above, each seperated by a line break as well as a '---' string on its own line." +
                    "Here is how your response should be formatted:" +
                    "**Event 1**: <name of event> \\n" +
                    "**Date**: <Date formatted as specified above>\\n" +
                    "**Time**: <Time formatted as specified above>\\n" +
                    "**Location**: <Location formatted as specified above>\\n" +
                    "**Extra Info**: <Extra info>\\n\n" +
                    "But obviously dont return the info inside <> tags" +

                    " Thanks!" },
            { role: "user", content: message },
        ],
        max_tokens,
    })
    let response = data.choices[0].message.content;
    //HERE
    function parseEvent(eventStr) {
        let strings = eventStr.split('\n');

        return {
            eventName: strings[0].split('*:')[1].trim(),
            date: strings[1].split('*:')[1].trim(),
            time: strings[2].split('*:')[1].trim(),
            location: strings[3].split('*:')[1].trim(),
            extraInfo: strings[4].split('*:')[1].trim()
        };



    }

    function parseString(str) {
        return str.split('---')         // Split by '---'
            .map((eventStr) => eventStr.trim())  // Trim each event string to remove extra whitespace/newlines
            .filter((eventStr) => eventStr)      // Filter out empty strings
            .map((eventStr) => parseEvent(eventStr)); // Parse each event string

    }
    return parseString(response);



}

module.exports.requestchat = requestchat;

// requestchat(message).then((response) => {
//     console.log(`Raw Response: ${response}`);
//     console.log(parseString(response));
// }).catch((error) => {
//     console.error(error);
// });


