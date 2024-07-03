const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUIwNEhzSFh2WG0xMUh1ZHNKc1BzbFZpL1hSRFlUSitKa2diak9heHhsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblNQWmRmWTAvamZVV0xPa0VkdUwvaHpjZzlXalZDUmZrNzFHSFdGSC9XRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJT1lTNVFTQ2lRd2dIcTRVbmNLbm5oeEVaSUJ0ZXJpMGNISmdZZ25FVDA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBaWh6Qm1wREt2QkxnU05pV2orNmJXZHlUR3IrREFUcDVKWHhTRVZVaVU0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMZnRYSXZTWmJwTUNVRVRad0JvMHBaa25NanFmUFh2S3lQSkdrVlBwbTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVmUkJyWFVWUE5sSjRoRlNRa09YdU5VcGxVaE5oN1N1ZXZteUFUSXlzV009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1BHVXZjSCtzR3B4c0U1SUlJeUF2ZS80NnhvSng5cWdpYUJBV042b1IzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFBFTVFwL0tSVUZXbmRJYkIvWm9jNnArVlViMGtaa0t4TDIxdDBBdmx3UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndhcjRmcVUvQ2d3U3poMzd3Q2d6eDJXeUwrdUJISU9lMDBDODNDclRwY25DbWxXU2lsbGE4bDVPc1VUOW1xSUViazZiQzk4K2dGUUUvREwxSHVTakJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiNXU5K29IY0hHMzZld3QrMkZIcG9TMDJsaE9zM25xRTBNWUV5bjB3R29vYz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNXlYSWhJSGdScm1YWHVDNUhxS0drZyIsInBob25lSWQiOiI1Y2VjYzczOS1lMDc3LTQ2NjktODYyZi1jYWI2ZjdlNmYxMWEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclZnb0R4aU5uajdCc1RTT0dYTG5nZHRmajJFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp3bE4wVDJwZzFjYmp1QTdKWUJ1c0xBemVtVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJQM0JFQVhZNiIsIm1lIjp7ImlkIjoiMjYwOTcxODE2OTU2OjYxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1ha28ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0txcGxza0VFSXZXbExRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ijl3dGdBeWhFdjdsRWRBQUpsMUFOZE82SzQzeVNPM3pQM0RnSmNLU09pbXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImVlWXEzN0I1VGw3MWtRRFVhUGZSellNM3BLd3ljcGd0a3U2c1NQaUhLVm80b3ZQRWtoYkFhVmE4QkFuWTZFNVFvQU9FakwvWXpmYmdENjNsMFZkMUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDUlFkUXBuWFRzOUJZdDBuS0Nud2JlckxnK0F0d1BvcEdUMU5YM3RwcjVpbFI0UGFZdWRKbThPR1pBV2hVQ2ovUjgrcTUvaFUzcElOZ2NxbVlHaTNBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDk3MTgxNjk1Njo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmY0xZQU1vUkwrNVJIUUFDWmRRRFhUdWl1TjhranQ4ejl3NENYQ2tqb3BzIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMDAzMzUyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "KING👑MAKO",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "260971816956", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'KING👑MAKO',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
