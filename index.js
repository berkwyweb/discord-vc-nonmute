const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates // Ses durumu için gerekli intent
    ]
});

const targetUserId = 'id';//mute yemeyecek kişinin idsi

client.on('ready', () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});

// Ses durumu değişikliklerini izleyen olay
client.on('voiceStateUpdate', async (oldState, newState) => {
    // Susturulma durumu kontrolü
    const oldMuteState = oldState.serverMute;
    const newMuteState = newState.serverMute;

    // Eğer kullanıcı susturulmuşsa ve ID'si eşleşiyorsa
    if (newState.id === targetUserId && oldMuteState === false && newMuteState === true) {
        try {
            // Kullanıcının susturulmasını kaldır
            await newState.setMute(false);
            console.log(`${newState.member.user.tag} susturuldu, otomatik olarak susturma kaldırıldı.`);
        } catch (error) {
            console.error(`Susturmayı kaldırırken bir hata oluştu: ${error}`);
        }
    }
});

client.login('token');
