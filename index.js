const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { token } = require("./config.json");
const fs = require('fs');
const axios = require("axios");

if (!fs.existsSync('./warnings.json')) {
    fs.writeFileSync('./warnings.json', JSON.stringify({}));
}

// Check if user has the required roles
const hasPermission = (message) => {
    const member = message.guild.members.cache.get(message.author.id);
    return member && allowedRoles.some(role => member.roles.cache.some(r => r.name === role));
};

// Initialize the bot client
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const allowedRoles = ["Owner", "Staff"];
const ROLE_DATA_FILE = 'roles.json';

// Load stored role data
let roleData = {};
if (fs.existsSync(ROLE_DATA_FILE)) {
    roleData = JSON.parse(fs.readFileSync(ROLE_DATA_FILE, 'utf8'));
}

// Save role data to file
function saveRoleData() {
    fs.writeFileSync(ROLE_DATA_FILE, JSON.stringify(roleData, null, 2));
}

client.on('guildMemberRemove', member => {
    // Store roles when a user leaves
    roleData[member.id] = member.roles.cache.map(role => role.id);
    saveRoleData();
});

client.once(Events.ClientReady, c => {
    console.log(`Espirit is online! Logged in as ${c.user.tag}`);

    // Display available commands in the terminal
    console.log("Commands work:");
});
 // Start sending memes every hour
 // Send meme immediately when the bot starts
sendMeme(); // Send meme immediately
setInterval(sendMeme, 1800000); // Send meme every 30 minutes (1800000 ms)

// The channel where memes will be sent automatically every hour
const channelId = '1347998767386984560'; // Replace with your channel ID

// Function to fetch and send meme
async function sendMeme() {
    try {
        const response = await axios.get("https://meme-api.com/gimme/dankmemes");
        const meme = response.data;

        // Fetch the channel by ID
        const channel = await client.channels.fetch(channelId);

        // Check if the channel exists
        if (channel) {
            // Send meme to the channel
            channel.send({
                content: `**${meme.title}**`,
                files: [meme.url]
            });

            console.log("Meme sent!");
        } else {
            console.error("Channel not found!");
        }
    } catch (error) {
        console.error("Error fetching meme:", error);
    }
}


const killMethods = [
    "throws a piano on",
    "launches a nuke at",
    "pushes into a lava pit",
    "feeds to a swarm of piranhas",
    "casts a deadly spell on",
    "traps in a room with no WiFi",
    "hacks into reality and deletes",
    "sends to the shadow realm",
    "summons a horde of zombies to devour",
    "tricks into falling into an endless void",
    "drowns in a vat of jello",
    "encases in an impenetrable ice block",
    "summons a black hole to consume",
    "drops from an airplane without a parachute",
    "exposes to an infinite loop of TikToks",
    "sucks into a vacuum of space",
    "encourages to fight a bear with no weapons",
    "sends to a desert with no water",
    "locks in a room filled with bees",
    "transforms into a potato and crushes",
    "feeds to a giant mutant crab",
    "strikes with a bolt of lightning",
    "throws into a pit of angry squirrels",
    "locks in a room full of spiders",
    "sends to a dimension where time stands still",
    "turns into a werewolf during a full moon",
    "forces to play Monopoly forever",
    "pushes off a cliff into a sea of sharks",
    "sends to a land of eternal darkness",
    "saturates with superglue and leaves in the sun",
    "locks in a box of broken glass",
    "hurls into a pit of quicksand",
    "encases in molten steel",
    "throws into a volcano of pure acid",
    "traps in a room with infinite mirrors",
    "sends on a journey through a haunted forest",
    "forces to watch the worst reality TV show ever made",
    "straps to a rocket and launches into the sun",
    "sends into a tornado of nails",
    "casts a curse that makes every song play on repeat",
    "locks in a cage with a ravenous lion",
    "turns into a giant, unstoppable boulder",
    "traps in an elevator stuck between floors",
    "dunks into a pool of liquid nitrogen",
    "sends to an alternate dimension of eternal boredom",
    "encases in a block of solid cement",
    "forces to eat a never-ending bowl of spicy peppers",
    "locks in a room with an army of angry clowns",
    "straps to a chair and forces to watch every horror movie ever made",
    "casts a spell that turns every footstep into a landmine",
    "traps in a time loop of awkward social interactions",
    "drowns in a sea of angry rubber ducks",
    "traps in a maze with no exit",
    "shreds into tiny pieces by an army of paper shredders",
    "turns into a thousand angry bees",
    "throws into a gigantic blender",
    "sends to a world where gravity is reversed",
    "locks in a cage of giant, hungry chickens",
    "pushes off the edge of a waterfall into a pool of sharks",
    "forces to listen to the same joke over and over until they snap",
    "locks in a room with no air for 5 minutes",
    "sends to a reality where no one can hear their screams",
    "puts in a barrel and rolls down a hill of broken glass",
    "traps in an endless game of Simon Says",
    "transforms into a giant, crushing snowball",
    "throws into a vat of bubbling acid",
    "locks in a vault with no way out",
    "turns into a stone statue and shatters",
    "feeds to a black widow spider the size of a dog",
    "throws into a furnace filled with molten gold",
    "pushes into a pit of angry crocodiles",
    "strips away all color, leaving them in a world of gray",
    "traps in a room where every word they say is a lie",
    "puts in a giant cannon and shoots into space",
    "feeds into an endless maze of mirrors",
    "sends to an island full of aggressive gorillas",
    "pushes into a pit of angry bees that multiply",
    "forces to watch the same YouTube ad on loop for eternity",
    "makes them solve an impossible Rubik’s Cube",
    "transforms into a storm cloud and electrocutes",
    "locks in a freezer until frozen solid",
    "pushes into a dimension where everyone is a mannequin",
    "forces to swim in a pool filled with jellyfish",
    "locks in a room where all the food is expired",
    "turns into a giant, crushing stampede of cows",
    "turns into a scarecrow and gets burned in a field",
    "sends to a world of endless broken dreams",
    "forces to listen to endless static noise forever",
    "puts in a giant, crushing paper press",
    "encases in a brick wall and leaves them there forever",

    // Backfire Methods
    "accidentally throws a piano on themselves",
    "launches a nuke at themselves",
    "falls into their own lava pit",
    "feeds themselves to a swarm of piranhas",
    "casts a deadly spell on themselves",
    "traps themselves in a room with no WiFi",
    "hacks into reality and deletes themselves",
    "sends themselves to the shadow realm",
    "summons a horde of zombies to devour themselves",
    "tricks themselves into falling into an endless void",
    "drowns in a vat of jello themselves",
    "encases themselves in an impenetrable ice block",
    "summons a black hole to consume themselves",
    "drops themselves from an airplane without a parachute",
    "exposes themselves to an infinite loop of TikToks",
    "sucks themselves into a vacuum of space",
    "encourages themselves to fight a bear with no weapons",
    "sends themselves to a desert with no water",
    "locks themselves in a room filled with bees",
    "transforms into a potato and crushes themselves",
    "feeds themselves to a giant mutant crab",
    "strikes themselves with a bolt of lightning",
    "throws themselves into a pit of angry squirrels",
    "locks themselves in a room full of spiders",
    "sends themselves to a dimension where time stands still",
    "turns into a werewolf during a full moon and attacks themselves",
    "forces themselves to play Monopoly forever",
    "pushes themselves off a cliff into a sea of sharks",
    "sends themselves to a land of eternal darkness",
    "saturates themselves with superglue and leaves in the sun",
    "locks themselves in a box of broken glass",
    "hurls themselves into a pit of quicksand",
    "encases themselves in molten steel",
    "throws themselves into a volcano of pure acid",
    "traps themselves in a room with infinite mirrors",
    "sends themselves on a journey through a haunted forest",
    "forces themselves to watch the worst reality TV show ever made",
    "straps themselves to a rocket and launches into the sun",
    "sends themselves into a tornado of nails",
    "casts a curse that makes every song play on repeat for themselves",
    "locks themselves in a cage with a ravenous lion",
    "turns themselves into a giant, unstoppable boulder",
    "traps themselves in an elevator stuck between floors",
    "dunks themselves into a pool of liquid nitrogen",
    "sends themselves to an alternate dimension of eternal boredom",
    "encases themselves in a block of solid cement",
    "forces themselves to eat a never-ending bowl of spicy peppers",
    "locks themselves in a room with an army of angry clowns",
    "straps themselves to a chair and forces themselves to watch every horror movie ever made",
    "casts a spell that turns every footstep into a landmine for themselves",
    "traps themselves in a time loop of awkward social interactions",
    "drowns themselves in a sea of angry rubber ducks",
    "traps themselves in a maze with no exit",
    "shreds themselves into tiny pieces by an army of paper shredders",
    "turns themselves into a thousand angry bees",
    "throws themselves into a gigantic blender",
    "sends themselves to a world where gravity is reversed",
    "locks themselves in a cage of giant, hungry chickens",
    "pushes themselves off the edge of a waterfall into a pool of sharks",
    "forces themselves to listen to the same joke over and over until they snap",
    "locks themselves in a room with no air for 5 minutes",
    "sends themselves to a reality where no one can hear their screams",
    "puts themselves in a barrel and rolls down a hill of broken glass",
    "traps themselves in an endless game of Simon Says",
    "transforms themselves into a giant, crushing snowball",
    "throws themselves into a vat of bubbling acid",
    "locks themselves in a vault with no way out",
    "turns themselves into a stone statue and shatters",
    "feeds themselves to a black widow spider the size of a dog",
    "throws themselves into a furnace filled with molten gold",
    "pushes themselves into a pit of angry crocodiles",
    "strips away all color, leaving themselves in a world of gray",
    "traps themselves in a room where every word they say is a lie",
    "puts themselves in a giant cannon and shoots into space",
    "feeds themselves into an endless maze of mirrors",
    "sends themselves to an island full of aggressive gorillas",
    "pushes themselves into a pit of angry bees that multiply",
    "forces themselves to watch the same YouTube ad on loop for eternity",
    "makes themselves solve an impossible Rubik’s Cube",
    "transforms into a storm cloud and electrocutes themselves",
    "locks themselves in a freezer until frozen solid",
    "pushes themselves into a dimension where everyone is a mannequin",
    "forces themselves to swim in a pool filled with jellyfish",
    "locks themselves in a room where all the food is expired",
    "turns themselves into a giant, crushing stampede of cows",
    "turns themselves into a scarecrow and gets burned in a field",
    "sends themselves to a world of endless broken dreams",
    "forces themselves to listen to endless static noise forever",
    "puts themselves in a giant, crushing paper press",
    "encases themselves in a brick wall and leaves them there forever"
];

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.commandName;

    if (command === 'server') {
        await interaction.reply("Server invite and about owner:\n1. https://discord.gg/espirit\n2. https://guns.lol/espirit");
    }
    else if (command === 'clear') {
        const deleteCount = interaction.options.getInteger("amount") || 0;
        if (deleteCount > 100 || deleteCount < 1) {
            return interaction.reply("You can delete between 1 and 100 messages at a time.");
        }

        try {
            // Perform the bulk delete without message reference
            const deletedMessages = await interaction.channel.bulkDelete(deleteCount, true);
            const replyMessage = await interaction.reply(`Successfully deleted ${deletedMessages.size} messages.`);
            
            // Delete the confirmation message after 5 seconds (5000ms)
            setTimeout(() => {
                replyMessage.delete();
            }, 5000);
        } catch (error) {
            console.error('Error during message deletion:', error);
            interaction.reply("There was an error trying to delete messages. Please try again.");
        }
    }
});

client.on(Events.MessageCreate, async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "membercount") {
        const guild = message.guild;
        if (!guild) return;

        // Fetch all members to ensure accuracy
        const members = await guild.members.fetch();
        const humanCount = members.filter(member => !member.user.bot).size;

        message.channel.send(`This server has ${humanCount} members!`);

        message.delete().catch(err => console.error("Failed to delete message:", err));
    }
    if (command === "meme") {
        try {
            const response = await axios.get("https://meme-api.com/gimme/dankmemes");
            const meme = response.data;

            // Send the meme to the channel where the command was typed
            message.channel.send({
                content: `**${meme.title}**`,
                files: [meme.url]
            });

        } catch (error) {
            console.error("Error fetching meme:", error);
            message.channel.send("Couldn't fetch a meme. Try again later! 😭");

            message.delete().catch(err => console.error("Failed to delete message:", err));
        }
    }
    if (command === "roast") {
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day. 🌤️",
            "If I had a dollar for every time you said something smart, I'd be broke. 💸",
            "You're proof that even a broken clock is right twice a day. ⏰",
            "You bring everyone so much joy when you leave the room. 🙃",
            "I would agree with you, but then we’d both be wrong. 😜",
            "Your secrets are always safe with me. I never even listen when you tell me them. 😏",
            "You're like a software update. Whenever I see you, I think, 'Not now.' 🖥️",
            "I'd explain it to you, but I left my English-to-Dingbat dictionary at home. 📖",
            "You have the perfect face for radio. 📻",
            "You're like a slinky—fun to watch fall down the stairs, but not really helpful otherwise. 🤭",
            "If ignorance is bliss, you must be the happiest person alive. 😜",
            "You're the human equivalent of a participation trophy. 🏆",
            "You're the reason they put instructions on shampoo bottles. 🧴",
            "I’d say you’re one in a million, but that’s not quite true. There are at least 7 others just like you. 🙃",
            "You're like a software bug — annoying, and no one knows how to fix you. 😤",
            "You’re about as useful as a screen door on a submarine. 🚢",
            "Your brain is like a web browser. 27 tabs open, 18 of them are frozen, and 5 are playing music. 🧠",
            "You're like a broken pencil. Pointless. ✏️",
            "You’re like a phone with no signal — completely useless. 📵",
            "If you were any dumber, we’d have to water you. 💧",
            "You must be the square root of negative one, because you can’t be real. 📐",
            "You're like a Wi-Fi signal — weak and unreliable. 🌐",
            "Your idea of a good time is reading the terms and conditions. 📜",
            "You’re the human version of a participation award. 🏅",
            "I’d agree with you, but then we’d both be wrong. 🤷‍♂️",
            "You have the same energy as a brick — solid but not very useful. 🧱",
            "If I could rearrange the alphabet, I'd put U and I in different places. 😜",
            "You’re like a light bulb — the moment you start working, I wish I had a dimmer. 💡",
            "If I had a brain, I’d give it to you, but we both know that wouldn’t work. 🧠",
            "You remind me of a cloud. When you disappear, it’s a perfect day. 🌥️"
        ];
        
        const target = message.mentions.users.first() || message.author;
        const roastMessage = roasts[Math.floor(Math.random() * roasts.length)];
    
        message.channel.send(`<@${target.id}>, ${roastMessage}`);

        message.delete().catch(err => console.error("Failed to delete message:", err));
    }
    
//new command    
    if (command === 'kill') {
        const user = message.mentions.users.first();
        if (!user) return message.reply("You need to mention someone to kill!");
    
        const method = killMethods[Math.floor(Math.random() * killMethods.length)];
        message.channel.send(`**${message.author}** ${method} ${user}! 💀`);

        message.delete().catch(err => console.error("Failed to delete message:", err));
    }   
    //new command 
    if (command === 'rolecount') {
        if (args.length < 1) return message.reply('Please specify a role name.');

        const roleName = args.join(' ');
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (!role) return message.reply('Role not found.');

        try {
            // Fetch all members to ensure we get an updated list
            await message.guild.members.fetch();
            const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
            
            message.reply(`The role **${roleName}** has **${membersWithRole.size}** members.`);
        } catch (error) {
            console.error('Error fetching members:', error);
            message.reply('There was an error retrieving the role count. Please try again.');
        }
    }
    if (command === "insult") {
        const insults = [
            "You're like a penny – two-faced and not worth much.",
            "I'd agree with you, but then we’d both be wrong.",
            "You're the reason they put directions on shampoo bottles.",
            "You're proof that even evolution can make mistakes.",
            "You bring everyone so much joy… when you leave the room.",
            "You're about as useful as a screen door on a submarine.",
            "You're like a cloud. When you disappear, it’s a beautiful day.",
            "Your secrets are safe with me. I never even listen when you tell me them.",
            "You're so slow, even a snail would lap you in a race.",
            "Your jokes are so bad, even your reflection doesn't laugh.",
            "Your WiFi signal is stronger than your personality.",
            "You're the human version of a pop-up ad.",
            "Your presence is like a participation trophy – completely unnecessary.",
            "You're living proof that even mistakes can be made twice.",
            "You're like a candle in the wind… easily blown away and forgotten.",
            "You're the type of person who claps when the plane lands.",
            "You're the human equivalent of a typo.",
            "If I had a dollar for every intelligent thought you've had, I'd still be broke.",
            "You're the reason why warning labels exist.",
            "Your personality is like a brick wall—dull and unmovable.",
            "You're more disappointing than an unsalted pretzel.",
            "Your comebacks are so weak, even autocorrect wouldn’t fix them.",
            "You have the personality of a wet sponge.",
            "You’re like a cloud: You’re great when you’re not around.",
            "You're the only person I know who could trip over a wireless connection.",
            "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
            "You have the same energy as a broken pencil — pointless.",
            "You bring nothing to the table except your own disappointment.",
            "If your brain was taxed, you'd get a rebate.",
            "Your idea of a high five is you slapping yourself.",
            "You’re like a phone on 1%—I’m constantly worried about you. 🔋",
            "I'd explain it to you, but I left my English-to-Dingbat dictionary at home.",
            "You're a few sandwiches short of a picnic.",
            "You couldn't pour water out of a boot if the instructions were on the heel."
        ];
    
        const target = message.mentions.users.first() || message.author;
        const insultMessage = insults[Math.floor(Math.random() * insults.length)];
    
        message.channel.send(`<@${target.id}>, ${insultMessage}`);

        message.delete().catch(err => console.error("Failed to delete message:", err));
    }
    
    if (command === "welcome") {
        // Get the mentioned user
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user to welcome!");
    
        // Choose a random greeting and tag the mentioned user in the greeting
        const greetings = [
            `Welcome to the server, <@${member.id}>! 🎉 We're so glad to have you here! 😊`,
            `Hey <@${member.id}>! Welcome to the family! 🎉 Let’s make some awesome memories together! 😎`,
            `A big warm welcome to you, <@${member.id}>! 🙌 We're excited to have you with us! 💖`,
            `Welcome, <@${member.id}>! 🌟 The server just got a whole lot cooler with you here! 😏`,
            `Yay! <@${member.id}> is here! 🎉 Hope you're ready for some fun! Let's get started! 🚀`,
            `Hello <@${member.id}>! 🎈 Welcome aboard! We're all about good vibes here! ✨`,
            `Woot woot! Welcome <@${member.id}>! 🎉 Get ready for some epic chats and adventures! 😁`,
            `Hey there, <@${member.id}>! 🎉 Ready to enjoy the good times with everyone here? Let’s do this! 💥`,
            `Welcome, <@${member.id}>! You’ve just made our server 100x better just by joining! 🌟`,
            `So glad you joined, <@${member.id}>! Get comfy and enjoy the ride! 🌈🚀`,
            `The party's started now that you're here, <@${member.id}>! 🎉 Let's have some fun together! 😎`,
            `We’re all thrilled to have you, <@${member.id}>! 🌟 Let’s make this an unforgettable time! ✨`,
            `Welcome to the server, <@${member.id}>! 🎈 We're ready for the amazing energy you'll bring! 🎉`,
            `What’s up, <@${member.id}>? Welcome aboard! 🌟 The adventure starts now! 🏁`,
            `A huge welcome to you, <@${member.id}>! 🤗 Get ready to meet some amazing people! 😄`,
            `We're so excited to welcome you, <@${member.id}>! 💖 The fun is about to begin! 🎉`,
            `Glad you're here, <@${member.id}>! You're going to love it here! 💥`,
            `Hey, <@${member.id}>! The server just became ten times more awesome with you! 💫`
        ];
    
        // Send the welcome message
        message.channel.send(greetings[Math.floor(Math.random() * greetings.length)]);
    
        // Delete the command message
        message.delete().catch(err => console.error("Failed to delete message:", err));
    }    

    // !flirt command
    if (command === "flirt") {
        // Get the mentioned user
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user to flirt with!");
    
        const flirtMessages = [
            `Hey <@${member.id}>, are you a magician? Because whenever I look at you, everyone else disappears. 😏✨`,
            `Are you a camera, <@${member.id}>? Because every time I look at you, I smile. 😍📸`,
            `Is your name Google, <@${member.id}>? Because you've got everything I've been searching for. 😉💘`,
            `If I could rearrange the alphabet, I'd put U and I together. 😘💖`,
            `Is your dad a boxer, <@${member.id}>? Because you're a knockout! 🥊❤️`,
            `Do you have a map? Because I keep getting lost in your eyes, <@${member.id}>. 😏🗺️`,
            `Are you French? Because Eiffel for you. 😘🇫🇷`,
            `Excuse me, <@${member.id}>, but I think you dropped something: my jaw. 😳❤️`,
            `Are you a star? Because your beauty lights up the night sky. 🌟✨`,
            `If being cute was a crime, you’d be serving a life sentence, <@${member.id}>. 😁💥`,
            `I think you must be made of copper and tellurium, because you’re Cu-Te. 😘🔬`,
            `Is it hot in here or is it just you, <@${member.id}>? 🔥💋`,
            `Your smile is so contagious, I can’t stop grinning whenever I look at you, <@${member.id}>. 😁❤️`,
            `You must be a campfire, because you're hot and I want s'more. 🔥💘`,
            `I hope you know CPR, <@${member.id}>, because you just took my breath away! 😲💓`,
            `If I were a cat, I’d spend all 9 lives with you, <@${member.id}>. 😻💖`,
            `Are you made of sugar? Because you’re so sweet, <@${member.id}>! 🍭💖`,
            `You must be a parking ticket, because you’ve got FINE written all over you. 😉🚗`,
            `Your eyes are like the ocean, <@${member.id}>, and I’m lost at sea. 🌊👀`,
            `I must be a snowflake, because I've fallen for you, <@${member.id}>. ❄️❤️`,
            `Are you Wi-Fi? Because I'm feeling a connection. 😘💻`
        ];        
    
        // Pick a random flirt message
        const randomFlirt = flirtMessages[Math.floor(Math.random() * flirtMessages.length)];
    
        message.channel.send(randomFlirt);

        message.delete().catch(err => console.error("Failed to delete message:", err));

    }
    

    // !nice command
    if (command === "nice") {
        // Get the mentioned user
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user to say something nice about!");
    
        const niceMessages = [
            `<@${member.id}>, you're an amazing person and you brighten up everyone's day! 🌟`,
            `<@${member.id}>, your kindness and energy make this community a better place. Keep being awesome! 😊✨`,
            `<@${member.id}>, you're a true gem and we're lucky to have you around! 💎`,
            `<@${member.id}>, you have a heart of gold and it shows in everything you do. 💛✨`,
            `<@${member.id}>, your smile can light up the darkest room. Keep shining! 😊💡`,
            `<@${member.id}>, you're like a ray of sunshine on a cloudy day. 🌞 You make everything better!`,
            `<@${member.id}>, you're the kind of person the world needs more of. 🌍 Keep being amazing! 😄`,
            `<@${member.id}>, your positivity is contagious, and it's a blessing to have you here! 😇`,
            `<@${member.id}>, you're a rockstar! Never forget how amazing you are. 🎸🌟`,
            `<@${member.id}>, I hope you know how awesome you are and how much you inspire others. You're a true legend! 💪🎉`,
            `<@${member.id}>, you are simply outstanding and your kindness leaves a mark wherever you go! 💫`,
            `<@${member.id}>, you're like a magnet for happiness and positivity. Keep spreading those good vibes! ✨`,
            `<@${member.id}>, you're an inspiration to everyone around you! Keep being your incredible self. 🌟`,
            `<@${member.id}>, your energy is nothing short of magical. Keep shining and making the world better! 💖`,
            `<@${member.id}>, your laugh is contagious and it brightens everyone's day. Never stop being you! 😄🎉`,
            `<@${member.id}>, your passion for life is truly inspiring. The world needs more people like you. 🌍💖`,
            `<@${member.id}>, you're a true light in this community, and you make everything brighter just by being here. 🌟`,
            `<@${member.id}>, you radiate kindness and make the world a better place! Keep spreading your love and light. 🌟💛`,
            `<@${member.id}>, you're not just amazing, you're exceptional. Keep being your fantastic self! 💫`,
            `<@${member.id}>, I can’t help but admire how thoughtful and generous you are to everyone here. You rock! 🤘💖`,
            `<@${member.id}>, you're such a beautiful soul. The world is better with you in it. 💖🌍`
        ];
    
        // Pick a random nice message
        const randomNice = niceMessages[Math.floor(Math.random() * niceMessages.length)];
    
        message.channel.send(randomNice);

        message.delete().catch(err => console.error("Failed to delete message:", err));

    }
    
    if (command === 'kick') {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user to kick.");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return
    }

        const member = message.guild.members.cache.get(user.id);
        if (member) {
            await member.kick();
            message.reply(`${user.tag} has been kicked.`);
        } else {
            message.reply("That user is not a member of this server.");
        }
    }
    if (message.content.toLowerCase() === '!link') {
        const member = await message.guild.members.fetch(message.author.id);
        if (roleData[member.id]) {
            const rolesToAdd = roleData[member.id]
                .map(roleId => message.guild.roles.cache.get(roleId))
                .filter(role => role);
            
            if (rolesToAdd.length > 0) {
                await member.roles.add(rolesToAdd);
                message.reply('Your previous roles have been restored! ✅');
            } else {
                message.reply('No previous roles found or they are no longer available. ❌');
            }
            delete roleData[member.id]; // Remove data after restoring
            saveRoleData();
        } else {
            message.reply('No previous roles found for you. ❌');
        }
    }
    else if (command === 'ban') {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user to ban.");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return
    }

        const member = message.guild.members.cache.get(user.id);
        if (member) {
            await member.ban();
            message.reply(`${user.tag} has been banned.`);
        } else {
            message.reply("That user is not a member of this server.");
        }
    }
    // Handle warn command
else if (command === 'warn') {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a user to warn.");
    const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    // Read the warnings file
    const warnings = JSON.parse(fs.readFileSync('./warnings.json'));

    if (!warnings[user.id]) warnings[user.id] = [];
    warnings[user.id].push(reason);

    // Save the updated warnings to the file
    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

    message.reply(`${user.tag} has been warned. Reason: ${reason}`);
}
// Handle warning command to check warnings
else if (command === 'warnings') {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a user to check warnings.");

    const warnings = JSON.parse(fs.readFileSync('./warnings.json'));

    if (!warnings[user.id] || warnings[user.id].length === 0) {
        return message.reply(`${user.tag} has no warnings.`);
    }

    const warningList = warnings[user.id].map((warn, index) => `#${index + 1}: ${warn}`).join("\n");

    const embed = new EmbedBuilder()
        .setTitle(`${user.tag}'s Warnings`)
        .setDescription(warningList)
        .setColor(0xffcc00);

    message.reply({ embeds: [embed] });
}
// Handle dewarn command to remove a warning
else if (command === 'dewarn') {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a user to remove a warning.");
    const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

    const warnings = JSON.parse(fs.readFileSync('./warnings.json'));

    if (!warnings[user.id] || warnings[user.id].length === 0) {
        return message.reply(`${user.tag} has no warnings to remove.`);
    }

    const warningIndex = parseInt(args[1]) - 1;
    if (isNaN(warningIndex) || warningIndex < 0 || warningIndex >= warnings[user.id].length) {
        return message.reply("Please provide a valid warning number.");
    }

    // Remove the specified warning
    warnings[user.id].splice(warningIndex, 1);

    // Save the updated warnings to the file
    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

    message.reply(`Warning #${warningIndex + 1} has been removed from ${user.tag}.`);
}
    else if (command === 'unban') {
        const userId = args[0];
        if (!userId) return message.reply("Please provide the user ID to unban.");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        try {
            await message.guild.members.unban(userId);
            message.reply(`User with ID ${userId} has been unbanned.`);
        } catch (error) {
            message.reply("An error occurred while trying to unban that user.");
        }
    }
    if (command === 'mute') {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user to mute.");
        
        const args = message.content.split(' ');
        if (args.length < 3) return message.reply("Usage: `!mute @user <time><s/m/h/d>` (e.g., `!mute @user 10m`)");
    
        const requiredRoles = ['Owner', 'Staff'];
        if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
            return message.reply("You don't have permission to use this command.");
        }
    
        const member = message.guild.members.cache.get(user.id);
        let mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");
    
        if (!mutedRole) {
            try {
                mutedRole = await message.guild.roles.create({
                    name: "Muted",
                    permissions: []
                });
    
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(mutedRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });
            } catch (error) {
                return message.reply("Error creating the Muted role.");
            }
        }
    
        // Parse mute duration
        const durationMatch = args[2].match(/^(\d+)([smhd])$/);
        if (!durationMatch) return message.reply("Invalid time format. Use numbers followed by s (seconds), m (minutes), h (hours), or d (days).");
    
        const duration = parseInt(durationMatch[1]);
        const unit = durationMatch[2];
    
        let timeInMs;
        switch (unit) {
            case 's': timeInMs = duration * 1000; break;
            case 'm': timeInMs = duration * 60 * 1000; break;
            case 'h': timeInMs = duration * 60 * 60 * 1000; break;
            case 'd': timeInMs = duration * 24 * 60 * 60 * 1000; break;
            default: return message.reply("Invalid time unit.");
        }
    
        try {
            await member.roles.add(mutedRole);
            message.reply(`${user.tag} has been muted for ${duration} ${unit}.`);
    
            // Unmute after time expires
            setTimeout(async () => {
                if (member.roles.cache.has(mutedRole.id)) {
                    await member.roles.remove(mutedRole);
                    message.channel.send(`${user.tag} has been unmuted.`);
                }
            }, timeInMs);
    
        } catch (error) {
            message.reply("An error occurred while muting the user.");
        }
    }
    
    else if (command === 'unmute') {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user to unmute.");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        const member = message.guild.members.cache.get(user.id);
        const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!mutedRole || !member.roles.cache.has(mutedRole.id)) {
            return message.reply(`${user.tag} is not muted.`);
        }

        try {
            await member.roles.remove(mutedRole);
            message.reply(`${user.tag} has been unmuted.`);
        } catch (error) {
            message.reply("An error occurred while unmuting the user.");
        }
    }
    else if (command === 'crole') {
        const color = args[0];
        const roleName = args.slice(1).join(" ");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        if (!color || !roleName || !/^#[0-9A-F]{6}$/i.test(`#${color}`)) {
            return message.reply("Please provide a valid hex color code and a role name.");
        }

        try {
            const newRole = await message.guild.roles.create({
                name: roleName,
                color: `#${color}`
            });
            message.reply(`Role **${newRole.name}** with color **#${color}** has been created.`);
        } catch (error) {
            message.reply("An error occurred while creating the role.");
        }
    }
    else if (command === 'role') {
        const user = message.mentions.users.first();
        const roleName = args.slice(1).join(" ");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        if (!user || !roleName) return message.reply("Please mention a user and specify a role.");

        const role = message.guild.roles.cache.find(role => role.name === roleName);
        if (!role) return message.reply("That role doesn't exist.");

        const member = message.guild.members.cache.get(user.id);
        await member.roles.add(role);
        message.reply(`${user.tag} has been assigned the role ${roleName}.`);
    }
    else if (command === 'derole') {
        const user = message.mentions.users.first();
        const roleName = args.slice(1).join(" ");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        if (!user || !roleName) return message.reply("Please mention a user and specify a role.");

        const role = message.guild.roles.cache.find(role => role.name === roleName);
        if (!role) return message.reply("That role doesn't exist.");

        const member = message.guild.members.cache.get(user.id);
        await member.roles.remove(role);
        message.reply(`${user.tag} has been removed from the role ${roleName}.`);
    }
    else if (command === 'embed') {
        const title = args[0];
        const description = args.slice(1).join(" ");
        const requiredRoles = ['Owner', 'Staff'];

    // Check if the user has at least one of the required roles
    if (!message.member.roles.cache.some(role => requiredRoles.includes(role.name))) {
        return 
    }

        if (!title || !description) return message.reply("Please provide both a title and a description for the embed.");

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(0x3498db);

        message.channel.send({ embeds: [embed] });
    }
    else if (command === 'roleall') {
        if (!message.member.roles.cache.some(role => ['Owner', 'Staff'].includes(role.name))) {
            return 
        }
    
        if (args.length < 1) return message.reply('Please specify a role name.');
    
        const roleName = args.join(' ');
        const role = message.guild.roles.cache.find(r => r.name === roleName);
    
        if (!role) return message.reply('Role not found.');
    
        try {
            // Fetch all members to ensure we get an updated list
            await message.guild.members.fetch();
    
            const membersWithoutRole = message.guild.members.cache.filter(member => !member.roles.cache.has(role.id));
    
            if (membersWithoutRole.size === 0) return message.reply('All members already have this role.');
    
            membersWithoutRole.forEach(async (member) => {
                try {
                    await member.roles.add(role);
                    console.log(`Added ${roleName} to ${member.user.tag}`);
                } catch (error) {
                    console.error(`Failed to add role to ${member.user.tag}:`, error);
                }
            });
    
            message.reply(`Added the role **${roleName}** to ${membersWithoutRole.size} members.`);
        } catch (error) {
            console.error('Error fetching members:', error);
            message.reply('There was an error assigning the role. Please try again.');
        }
    }
    else if (command === 'deroleall') {
        if (!message.member.roles.cache.some(role => ['Owner', 'Staff'].includes(role.name))) {
            return 
        }
    
        if (args.length < 1) return message.reply('Please specify a role name.');
    
        const roleName = args.join(' ');
        const role = message.guild.roles.cache.find(r => r.name === roleName);
    
        if (!role) return message.reply('Role not found.');
    
        try {
            // Fetch all members to ensure we get an updated list
            await message.guild.members.fetch();
    
            const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
    
            if (membersWithRole.size === 0) return message.reply('No members found with that role.');
    
            membersWithRole.forEach(async (member) => {
                try {
                    await member.roles.remove(role);
                    console.log(`Removed ${roleName} from ${member.user.tag}`);
                } catch (error) {
                    console.error(`Failed to remove role from ${member.user.tag}:`, error);
                }
            });
    
            message.reply(`Removed the role **${roleName}** from ${membersWithRole.size} members.`);
        } catch (error) {
            console.error('Error fetching members:', error);
            message.reply('There was an error removing the role. Please try again.');
        }
    }    
    
    if (command === 'rolekick') {
        if (!message.member.roles.cache.some(role => role.name === 'Owner')) {
            return 
        }

        if (args.length < 1) return message.reply('Please specify a role name.');

        const roleName = args.join(' ');
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (!role) return message.reply('Role not found.');

        try {
            // Fetch all members to ensure we get an updated list
            await message.guild.members.fetch();

            const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));

            if (membersWithRole.size === 0) return message.reply('No members found with that role.');

            membersWithRole.forEach(async (member) => {
                if (member.kickable) {
                    try {
                        await member.kick('Kicked by rolekick command');
                        console.log(`Kicked ${member.user.tag}`);
                    } catch (error) {
                        console.error(`Failed to kick ${member.user.tag}:`, error);
                    }
                } else {
                    message.reply(`Cannot kick ${member.user.tag}, insufficient permissions.`);
                }
            });

            message.reply(`Kicked ${membersWithRole.size} members with the role **${roleName}**.`);
        } catch (error) {
            console.error('Error fetching members:', error);
            message.reply('There was an error fetching members. Please try again.');
        }
    }
    if (command === 'editembed') {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply("You don't have permission to use this command.");
        }

        const messageId = args.shift();
        const newContent = args.join(' ');

        if (!messageId || !newContent) {
            return message.reply("Usage: `!editembed <messageId> <new content>`");
        }

        try {
            const fetchedMessage = await message.channel.messages.fetch(messageId);
            if (!fetchedMessage.embeds.length) {
                return message.reply("That message does not contain an embed.");
            }

            const updatedEmbed = new EmbedBuilder()
                .setColor(fetchedMessage.embeds[0].color || 0x0099ff)
                .setTitle(fetchedMessage.embeds[0].title || 'Edited Embed')
                .setDescription(newContent)
                .setFooter({ text: `Edited by ${message.author.tag}` });

            await fetchedMessage.edit({ embeds: [updatedEmbed] });
            message.reply("Embed updated successfully.");
        } catch (error) {
            console.error(error);
            message.reply("Could not edit the embed. Make sure the message ID is correct and the bot has permissions.");
        }
    }
});

client.login(token);