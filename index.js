const axios = require('axios');

const token = ''; // Aca pon tu token
const channelId = ''; // Aca el ID del canal que quieres spamear con hilos

const banner = `
\x1b[31m
     ██████╗██╗      █████╗ ███╗   ██╗      ███████╗██████╗ ███████╗                                                   
    ██╔════╝██║     ██╔══██╗████╗  ██║      ██╔════╝██╔══██╗██╔════╝██╗                                                 
    ██║     ██║     ███████║██╔██╗ ██║█████╗█████╗  ██████╔╝█████╗  ╚═╝                                                 
    ██║     ██║     ██╔══██║██║╚██╗██║╚════╝██╔══╝  ██╔══██╗██╔══╝  ██╗                                                 
    ╚██████╗███████╗██║  ██║██║ ╚████║      ███████╗██████╔╝██║     ╚═╝                                                 
    ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝      ╚══════╝╚═════╝ ╚═╝                                                         
                                                                                                                   
   ████████╗██╗  ██╗██████╗ ███████╗ █████╗ ██████╗     ███████╗██████╗  █████╗ ███╗   ███╗███╗   ███╗███████╗██████╗ 
   ╚══██╔══╝██║  ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗    ██╔════╝██╔══██╗██╔══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗
      ██║   ███████║██████╔╝█████╗  ███████║██║  ██║    ███████╗██████╔╝███████║██╔████╔██║██╔████╔██║█████╗  ██████╔╝
      ██║   ██╔══██║██╔══██╗██╔══╝  ██╔══██║██║  ██║    ╚════██║██╔═══╝ ██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗
      ██║   ██║  ██║██║  ██║███████╗██║  ██║██████╔╝    ███████║██║     ██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║
      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝     ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                                                   
                          discord.gg/23mkRkGDJf | /23mkRkGDjf
\x1b[0m
`;

console.log(banner);
console.log('Created by C4PTM & Yaini');

(async () => {
  try {
    const response = await axios.get(`https://discord.com/api/v10/channels/${channelId}/messages?limit=100`, {
      headers: {
        'Authorization': token  
      }
    });

    const messages = response.data;
    const threadIds = [];

    for (const message of messages) {
      try {
        const threadResponse = await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages/${message.id}/threads`, {
          name: `clan-ebf-domina`,
          auto_archive_duration: 60, 
        }, {
          headers: {
            'Authorization': token  
          }
        });

        const threadId = threadResponse.data.id;
        threadIds.push(threadId);
        console.log(`\x1b[32m[$] Se pudo crear el hilo ${threadResponse.data.name}\x1b[0m`);  

      } catch (error) {
        console.error(`\x1b[31m[x] ERROR: No se pudo crear el hilo para el mensaje ${message.id}: ${error.response?.data || error.message}\x1b[0m`);  // Mensaje de error en rojo
      }
    }

    for (const threadId of threadIds) {
      for (let i = 0; i < 100; i++) {
        try {
          await axios.post(`https://discord.com/api/v10/channels/${threadId}/messages`, {
            content: '@everyone Spammed by Clan-EBF, join clan-ebf now \nhttps://discord.gg/23mkRkGDJf'
          }, {
            headers: {
              'Authorization': token  
            }
          });
        } catch (error) {
          console.error(`\x1b[31m[x] ERROR: No se pudo enviar el mensaje al hilo ${threadId}: ${error.response?.data || error.message}\x1b[0m`); 
        }
      }
    }

    console.log('\x1b[32m[✔] Spam completado en todos los hilos.\x1b[0m');
  } catch (error) {
    console.error(`\x1b[31m[x] ERROR: Ocurrió un problema al procesar el canal: ${error.response?.data || error.message}\x1b[0m`);  
  }
})();
