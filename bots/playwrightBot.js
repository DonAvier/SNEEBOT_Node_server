const playwright = require("playwright");

const randomDelay = Math.random() * 2000 + 175;

const playwritghtBot = async () => {
    console.log("BOT AVVIATO");
    const browser = await playwright.chromium.launch({
        headless: false,
    });

    console.log("BROWSER CREATO");
    const context = await browser.newContext({
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
        locale: "en-US", // Imposta la lingua del browser
        viewport: { width: 1366, height: 768 }, // Imposta le dimensioni dello schermo
        permissions: ["geolocation", "notifications"], // Imposta le autorizzazioni del browser
        ignoreHTTPSErrors: true, // Ignora gli errori HTTPS
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
    console.log("ASPETTO 5 SECONDI");
    await page.waitForTimeout(randomDelay);
    console.log("ASPETTATO");

    await page.getByRole("button", { name: "Accetta tutti" }).click();
    await page
        .frameLocator('iframe[name="mainFrame"]')
        .getByPlaceholder("Email")
        .click();
    await page
        .frameLocator('iframe[name="mainFrame"]')
        .getByPlaceholder("Email")
        .fill("Michelelunghi@ciao");
    await page
        .frameLocator('iframe[name="mainFrame"]')
        .getByPlaceholder("Email")
        .press("Tab");
    await page
        .frameLocator('iframe[name="mainFrame"]')
        .getByRole("textbox", { name: "Password" })
        .fill("Testtest");
    await page
        .frameLocator('iframe[name="mainFrame"]')
        .getByRole("button", { name: "SIGN IN" })
        .click();
};

module.exports = { playwritghtBot };
