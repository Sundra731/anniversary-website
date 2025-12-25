import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './models/Story.js';
import Reason from './models/Reason.js';
import LoveLetter from './models/loveLetter.js';
import Music from './models/Music.js';
import connectDB from './config/database.js';

dotenv.config();

// Sample Stories Data
const sampleStories = [
    {
        title: 'First Hang Out',
        description: 'I was soooo nervous, you could not stop looking at me😂. You held my hand, placed your head on my chest, looked at my thighs, carried me. You did a lot for a first day but it is literally one of my favorite memories of us.',
        date: 'October 26, 2024',
        order: 1,
    },
    {
        title: 'First Kiss',
        description: 'Honestly, i cannot like pin point when our first kiss was because there were already numerous cheek kisses and pecks from you😂. But i am glad we did not wait till your birthday.',
        date: 'November 1-3?, 2024',
        order: 2,
    },
    {
        title: 'First I Love You',
        description: 'Now that I think about it we were moving fast, really fast. But i am glad we did. November 4th. I have loved you since and i know that i will love you always and forever. Always baby..',
        date: 'November 4, 2024',
        order: 3,
    },
];

// Sample Reasons Data
const sampleReasons = [
    { number: 1, text: "You're smart" },
    { number: 2, text: "You're caring" },
    { number: 3, text: "You're loving" },
    { number: 4, text: "You are very funny and you make laugh" },
    { number: 5, text: "You make me feel safe" },
    { number: 6, text: "You make me feel comfortable" },
    { number: 7, text: "You are supportive" },
    { number: 8, text: "You make me feel understood" },
    { number: 9, text: "You bring out my feminine side" },
    { number: 10, text: "You know so much(kajua)" },
    { number: 11, text: "You have nice lips(the best)" },
    { number: 12, text: "You cook very nice food for me " },
    { number: 13, text: "You are open-minded and flexible" },
    { number: 14, text: "You sacrifice a lot for me including your feelings" },
    { number: 15, text: "You are a positive person and sometimes you help me think positively too" },
    { number: 16, text: "You have beautiful eyes" },
    { number: 17, text: "You have a nice butt(jelly and squishy)" },
    { number: 18, text: "You urge me to be confident everyday" },
    { number: 19, text: "You make me grow(more than you think)" },
    { number: 20, text: "You treat me like a princess(sometimes)" },
    { number: 21, text: "You make me happy(more than you know)" },
    { number: 22, text: "You eat a lot like me" },
    { number: 23, text: "You have nice eyebrows(or a growing unibrow)" },
    { number: 24, text: "You include me in your future" },
    { number: 25, text: "You call me your little kitten" },
    { number: 26, text: "You put up with me a lot even though you don't have to" },
    { number: 27, text: "You are good peoples, everyone likes you" },
    { number: 28, text: "I want to take care of you like my baby. You spend your entire life taking care of everyone, someone has to take care of you." },
    { number: 29, text: "You have a beautiful, pretty face" },
    { number: 30, text: "You have a beautiful smile" },
    { number: 31, text: "You make me feel appreciated" },
    { number: 32, text: "You accept me the way I am" },
    { number: 33, text: "You are literally my baby doll" },
    { number: 34, text: "I wanna see you happy, i just want you to be happy(with me though)" },
    { number: 35, text: "You compliment me a lot" },
    { number: 36, text: "You are always there for me in your own weird jokingly way" },
    { number: 37, text: "Depending on the situation, you will be willing to protect me" },
    { number: 38, text: "I LOVE your sense of humour😂" },
    { number: 39, text: "You are wise, like a lot" },
    { number: 40, text: "You helped me embrace and love my body" },
    { number: 41, text: "You don't play when it comes to me" },
    { number: 42, text: "I love how much you love and care about your family" },
    { number: 43, text: "You care a lot about health" },
    { number: 44, text: "You LOVE money and I love that you do" },
    { number: 45, text: "You love yourself a lot" },
    { number: 46, text: "I love how you tell people that you are married" },
    { number: 47, text: "You make me so so proud" },
    { number: 48, text: "You value my opinions(sometimes)" },
    { number: 49, text: "Your mind, how you think" },
    { number: 50, text: "I love how you solve problems" },
    { number: 51, text: "You stand out, a lot, you're just beautiful" },
    { number: 52, text: "You're very observant" },
    { number: 53, text: "You're nice especially to others" },
    { number: 54, text: "Your cuddles" },
    { number: 55, text: "Your kisses" },
    { number: 56, text: "Your hugs" },
    { number: 57, text: "You're very honest, well sometimes" },
    { number: 58, text: "I love when you are energetic" },
    { number: 59, text: "I love sleeping next to you" },
    { number: 60, text: "Your pancakes" },
    { number: 61, text: "You make my life so much better" },
    { number: 62, text: "The way you are not easily influenced" },
    { number: 63, text: "I like how secretive you are(to other people of course)" },
    { number: 64, text: "You are very very annoying" },
    { number: 65, text: "I can be all versions of myself around you" },
    { number: 66, text: "You took your time to get to know me" },
    { number: 67, text: "You worked very hard to make me comfortable" },
    { number: 68, text: "You put my needs before yours" },
    { number: 69, text: "You have good taste, in almost everything" },
    { number: 70, text: "I like your soft hair(including body hair)" },
    { number: 71, text: "I love it when you cook for me, your food is really good" },
    { number: 72, text: "I love that I have learned so much from you" },
    { number: 73, text: "I love that I trust you with my life(emotionally, not fully but I trust you with my life, I know I'm always safe with you)" },
    { number: 74, text: "I love the sleepovers, most of the time they're fun" },
    { number: 75, text: "My favorite moments are when we're together"},
    { number: 76, text: "Your dominance and strictness is attractive" },
    { number: 77, text: "You turn me on, a lot, in both sexual and non-sexual ways" },
    { number: 78, text: "I love how tall you are, just perfect, not too tall" },
    { number: 79, text: "The way you make me feel irreplaceable" },
    { number: 80, text: "I love how independent you usually are, but sometimes you need to let people help you" },
    { number: 81, text: "I love that we can be friends, and lovers at the same time" },
    { number: 82, text: "I love that we can have meaningful conversations" },
    { number: 83, text: "I love the fact that we are really close, and we're so used to each other. " },
    { number: 84, text: "You always try to put me first, before others." },
    { number: 85, text: "You're my best friend too(kataa ushangae)" },
    { number: 86, text: "You're a really gorgeous human being." },
    { number: 87, text: "Your forehead kisses." },
    { number: 88, text: "I love it when u force me into situations." },
    { number: 89, text: "You take good care of me(nimegain weight because of u)" },
    { number: 90, text: "Kids love u, everyone does" },
    { number: 91, text: "You are what i wanted and more" },
    { number: 92, text: "You are all that(i promise)" },
    { number: 93, text: "Your cuddles especially at night" },
    { number: 94, text: "You are the love of my life" },
    { number: 95, text: "You make forever sound perfect" },
    { number: 96, text: "You baby me sometimes and i like that" },
    { number: 97, text: "You make saying bye hard(i always love spending time with you)" },
    { number: 98, text: "You complete me in ways I never knew I needed" },
    { number: 99, text: "I love you because it is YOU, i love you" },
    { number: 100, text: "You are my always and forever" }
];

// Sample Love Letters Data
const sampleLetters = [
    {
        title: 'To Sweet Kevvyy',
        content: `My sweet boy,

    I love you. I just want you to know that i love you and i always will. I am blessed to have you, literally the best thing that happened to me since 2024. I appreciate you, i cherish you, i care about you, i love you. 
    You mean the world to me. I hope and pray you get everything you've ever wished for and i hope that i'll be by your side through it all. 
    
    And also, you take care of everyone. Sure it's hot and sexy seeing you responsible and in charge, but i want you to depend on me. 
    You do yes, but more. Let someone take care of you other than yourself. That's why you have a girlfriend. Being a man is not easy, you have to be tough blah blah blah. But you can be vulnerable with me and you can lean on me. I love you kevvyy.`,
        order: 1,
    },
    {
        title: 'Appreciation',
        content: `To the love of my life,

    I see all of it. How you take care of me, you feed me a lot adi sai nimegain so much weight. How i get anything i want, well at least most of them. How you cater to me, how you protect me, sacrifice for me, make me laugh.
    How you took your time to get to know me and make me comfortable. You knew how much shy i was, how weird i was, how insecure i was,and i remember you saying, if i let you be, people will take advantage of you because you're too naive. You took me in,taught me a lot and i am a better version of myself a year later. I am growing, and you've played a big role in that.
    I appreciate you so much, more that you know. I see it all, and i am really grateful. Thank you so so so much baby, I love you`,
        order: 2,
    },
    {
        title: 'A Promise',
        content: `My Baby Doll,
    I promise to always support you. I promise to always love you, to always respect you. I promise to always try and comprehend you. I haven't been the best at understanding you and i am really sorry.
    I promise to consider you and your feelings, i promise to always strive and be better, for us. 
    I am sorry for all the pain that i have caused you, for not being able to understand you sometimes. I know that you sacrifice a lot especially emotionally for me. I just hope you are happy, I want you to be happy.
    I want you to speak to me and i want you to know that i care. I am sorry. I love you so much baby.
    `,
        order: 3,
    },
];

// Sample Music Data
const sampleMusic = [
    {
        title: 'Kiss Me More',
        artist:'Doja Cat, SZA',
        youtubeUrl: 'https://youtu.be/0EVVKs6DQLo?si=zD7HwvOvZuA9Hugn',
        description: 'It is the only good song I could think of that we both actually liked😂. Plus yes Kiss me more.',
        order: 1,
    },
    {
        title: 'Lover Girl',
        artist: 'Meghan thee Stallion',
        youtubeUrl: 'https://youtu.be/VjtrfCDDelQ?si=tXEGjcPMNm_FFUYh',
        description: 'My man my man my man my baby my baby😛😙.',
        order: 2,
    },
    {
        title: 'Best Part',
        artist: 'Daniel Ceaser, H.E.R',
        youtubeUrl: 'https://youtu.be/75-Com9Bo_s?si=0uvjWYFCy1lLtHqY',
        description: 'If life was a movie, the you are the best part.',
        order: 3,
    },
    {
        title: 'Generous',
        artist: 'Doja Cat',
        youtubeUrl: 'https://youtu.be/o2m8UHK_tUU?si=s75u6Ko0kC3rTXkP',
        description: 'This song reminds me of the time i had a very huge crush on you, i was so scared.',
        order: 3,
    },
    {
        title: 'Comfortable',
        artist: 'H.E.R',
        youtubeUrl: 'https://youtu.be/MBgXyiZfWUI?si=M_-W6CjtO9CggZoi',
        description: 'I am comfortable and safe with you, thank you for making that happen.',
        order: 3,
    },
    {
        title: 'Gentle',
        artist: 'Tanerelle',
        youtubeUrl: 'https://youtu.be/5iBkF6Z0-3E?si=rvUXvWg3I5SvQBRE',
        description: 'Well, listen to the song(i wanted one that is a bit sexual so i chose this).',
        order: 3,
    }
];

// Function to seed all data
const seedData = async () => {
    try {
        // Connect to database
        await connectDB();
        
        console.log('🌱 Starting to seed data...\n');
        
        // Seed Stories
        await Story.deleteMany({});
        await Story.insertMany(sampleStories);
        console.log('✅ Sample stories added successfully!');
        console.log(`   Added ${sampleStories.length} stories\n`);
        
        // Seed Reasons
        await Reason.deleteMany({});
        await Reason.insertMany(sampleReasons);
        console.log('✅ Sample reasons added successfully!');
        console.log(`   Added ${sampleReasons.length} reasons\n`);
        
        // Seed Love Letters
        await LoveLetter.deleteMany({});
        await LoveLetter.insertMany(sampleLetters);
        console.log('✅ Sample love letters added successfully!');
        console.log(`   Added ${sampleLetters.length} love letters\n`);
        
        // Seed Music
        await Music.deleteMany({});
        await Music.insertMany(sampleMusic);
        console.log('✅ Sample music added successfully!');
        console.log(`   Added ${sampleMusic.length} songs\n`);
        
        console.log('🎉 All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

// Run the seed function
seedData();