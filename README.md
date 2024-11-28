🎙️ Discord Bot: Otomatik Susturma Kaldırıcı 🎙️
Bu Discord botu, belirli bir kullanıcının susturulmasını (server mute) algılar ve otomatik olarak bu susturma durumunu kaldırır. Bot, ses kanallarında belirli bir kullanıcı için ekstra bir kontrol sağlar ve onların susturma durumuna müdahale eder.

📜 Nasıl Çalışır?
Discord.js Modülü ile Bot Oluşturma

Client nesnesi, botun çalışması için temel yapıdır.
Gerekli Intent'ler:
Guilds: Sunucu olaylarını izlemek için.
GuildMembers: Sunucu üyelerinin durumlarını kontrol etmek için.
GuildVoiceStates: Kullanıcıların sesli kanal durumlarını izlemek için.
Hedef Kullanıcı Tanımlama

const targetUserId = 'id'; satırıyla, hedef kullanıcının Discord ID'si belirtilir. Bot, yalnızca bu ID'ye sahip kullanıcıyı izler.
Botun Başlatılması

client.on('ready', ...) olayı ile botun başarıyla başlatıldığı konsola yazdırılır.
Ses Durumu Güncellemelerini Dinleme

voiceStateUpdate olayı sayesinde ses durumundaki değişiklikler anında algılanır.
Eski ve yeni susturma durumları karşılaştırılarak:
Eğer kullanıcı susturulmuşsa (serverMute: true), bot bu durumu kontrol eder.
Hedef kullanıcı ID’si eşleştiğinde susturma otomatik olarak kaldırılır.
Susturma Durumunun Kaldırılması

newState.setMute(false) yöntemiyle kullanıcının susturması kaldırılır.
Başarılı olursa, konsola bilgi yazdırılır. Bir hata oluşursa bu hata konsola kaydedilir.




💻 Kod Parçaları ve Açıklamaları
Botun Başlatılması
javascript
Kodu kopyala
client.on('ready', () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});
Bot başlatıldığında, kendi adını konsola yazdırır. Bu, botun aktif olduğuna dair bir işarettir.
Ses Durumunun İzlenmesi
javascript
Kodu kopyala
client.on('voiceStateUpdate', async (oldState, newState) => {
    const oldMuteState = oldState.serverMute;
    const newMuteState = newState.serverMute;

    if (newState.id === targetUserId && oldMuteState === false && newMuteState === true) {
        try {
            await newState.setMute(false);
            console.log(`${newState.member.user.tag} susturuldu, otomatik olarak susturma kaldırıldı.`);
        } catch (error) {
            console.error(`Susturmayı kaldırırken bir hata oluştu: ${error}`);
        }
    }
});
voiceStateUpdate olayı, ses kanallarında olan değişiklikleri algılar.
Kullanıcının eski (oldState) ve yeni (newState) susturma durumları karşılaştırılır.
Eğer kullanıcı susturulmuşsa ve ID eşleşiyorsa:
setMute(false) ile susturma kaldırılır.
Başarılı işlem konsola yazdırılır.
Botun Tokeni ile Giriş
javascript
Kodu kopyala
client.login('token');
Botun çalışması için Discord Developer Portal’dan alınan bir token gereklidir. Bu token, botun Discord API'sine bağlanmasını sağlar.

🌟 Öne Çıkan Özellikler
Dinamik Susturma Kaldırma: Sadece hedeflenen kullanıcı için çalışır.
Gerçek Zamanlı İzleme: Kullanıcının susturma durumu anında algılanır.
Hata Yönetimi: Susturma kaldırma sırasında oluşan hatalar konsola yazdırılır.
🛠️ Gereksinimler
Node.js ve Discord.js modülü.
Discord Bot Token: Discord Developer Portal üzerinden alınabilir.






📦 Nasıl Kullanılır?
Proje Dizini Oluşturun:
mkdir discord-bot
cd discord-bot
Gerekli Modülleri Yükleyin:
# npm install discord.js
Kodu Bir Dosyaya Yapıştırın: Örneğin, index.js adlı bir dosya oluşturun ve yukarıdaki kodu içine yapıştırın.
Botunuzu Çalıştırın:
node index.js
