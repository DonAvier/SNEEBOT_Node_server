const playwright = require("playwright");
//HELPER
const { DBJsonConnect } = require("../helper/jsonHelper");
const { createLocator } = require("../helper/botHelper");
//ROTTE
const Rotte = require("../Rotte");
//HUBS
const botshub = require("../hubs/botshub");
//GUID
const { v4: uuidv4 } = require("uuid");

const randomDelay = Math.random() * 5000 + 175;
const smallRandomDelay = Math.random() * 300 + 300;

const playwritghtBot = async (bot) => {
    const BotGuid = uuidv4();
    botshub.invokeHubMethod("RegisterBot", BotGuid);

    const botSpeed = 0.2;

    console.log("BOT AVVIATO");
    const browser = await playwright.chromium.launch({
        headless: false,
    });

    console.log("BROWSER CREATO");
    //TODO:https://playwright.dev/docs/api/class-browser geolocation,proxy,permission
    const context = await browser.newContext({
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
        locale: "it-IT", // Imposta la lingua del browser
        viewport: { width: 1366, height: 768 }, // Imposta le dimensioni dello schermo
        permissions: ["geolocation", "notifications"], // Imposta le autorizzazioni del browser
        ignoreHTTPSErrors: true, // Ignora gli errori HTTPS
        javaScriptEnabled: true,
    });

    console.log("CONTEXT CREATO");

    context.on("page", async (page) => {
        await page.on("dialog", async (dialog) => {
            await dialog.dismiss();
        });
    });

    const page = await context.newPage();

    await page.goto("https://webmail.aruba.it/index.php#webmail/main/Inbox");

    console.log("ARRIVATO SULLA PAGINA");
    console.log("ASPETTO");
    await page.waitForTimeout(randomDelay * botSpeed);
    console.log("ASPETTATO");

    //EVENTO PER REGISTRARE PAUSA BOT
    //EVENTO PER STOPPARE BOT
    //EVENTO PER RIPRENDERE BOT

    //CONNESIONE A DB DI UTENTI CON POSSIBILITA DI DIVISIONE DEL CARICO DI LAVORO PER UNITA DI ESECUZIONE
    //CONFIGURAZIONE - UTENTI -> ACCOUNT

    //GOOGLE VOICE -> API ? API : BOT
    //PROXY

    //SERVIZIO PER AUTOMATIZZARE NUOVE SCARPE CON NOTIFICA

    //INSTAGRAM!! -> RICERCA TRA UTENTI CHE SEGUONO O ACCOUNT FAKE PER OGNI UTENTE??? FARE VALUTAZIONI

    //TROPPE COSE DA FARE DA SOLO AIUTO NON HO TEMPO, TROVARE AIUTANTI URGENTE X_X  o_O bruhhh damn son sto impazzendo

    //FARE BOT ANCHE PER DRAFT (UGALE AL 95% a questo, capire come DRY)

    DBJsonConnect(Rotte.JSONCmdPath(bot.id), async (CmdList) => {
        if (CmdList) {
            //await page.getByRole("button", { name: "Accetta tutti" }).click();

            for (let i = 0; i < CmdList.data.length; i++) {
                try {
                    //EVENTO REGISTRO ARRIVO SU COMANDO
                    botshub.invokeHubMethod("TODO", BotGuid);

                    await page.waitForTimeout(randomDelay * botSpeed);

                    //EVENTO REGISTRO FINITA ATTESA DI DEFAULT -> Esecuzione
                    botshub.invokeHubMethod("TODO", BotGuid);
                    const cmd = CmdList.data[i];
                    if (
                        cmd.query ==
                        "#uiLogic_postmaster_utils_FullOrLocalEmailInput_1"
                    ) {
                        const a = 1;
                    }
                    const locator = createLocator(page, cmd);

                    if (cmd.action) {
                        if (cmd.action.action == 1) {
                            await locator.click();
                        } else if (cmd.action.action == 2) {
                            await locator.press(cmd.action.value);
                        } else if (cmd.action.action == 3) {
                        } else if (cmd.action.action == 4) {
                            if (cmd.action.randomWait) {
                                await locator.type(cmd.action.value, {
                                    delay: smallRandomDelay,
                                });
                            } else {
                                await locator.type(cmd.action.value, {
                                    delay: cmd.action.delay,
                                });
                            }
                        }
                    }

                    //FARE TRY CATH CON SCREENSHOT DELL' ERRORE

                    await page.waitForTimeout(1000);
                    //EVENTO COMANDO COMPLETATO CON SUCCESSO
                    botshub.invokeHubMethod("TODO", BotGuid);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
};

module.exports = { playwritghtBot };
