//MODULI
const { writeFileSync } = require("fs");
const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");
require("dotenv").config();
//HELPER
const { DBJsonConnect } = require("../helper/jsonHelper");
//ROTTE
const Rotte = require("../Rotte");
//FINE MODULI

module.exports.runQuery = async (bot) => {
    console.log("START!!!!!!!!!!!");
    console.log(bot);
    //Caricamento liste e oggetti per bot

    DBJsonConnect(Rotte.JSONConfigFile(bot.id), (resultConfig) => {
        if (resultConfig) {
            const ConfigList = resultConfig.data.slice(0);
            DBJsonConnect(Rotte.JSONUsersPath(bot.id), (resultUsers) => {
                if (resultUsers) {
                    const Users = resultUsers.data.slice(0);
                    DBJsonConnect(
                        Rotte.JSONCmdPath(bot.id),
                        async (resultCmdList) => {
                            if (resultCmdList) {
                                const CmdList = resultCmdList.data.slice(0);

                                //LANCIO
                                puppeteer.use(hidden());

                                const browser = await puppeteer.launch({
                                    //args: ['--proxy-server=zproxy.lum-superproxy.io:22225'],
                                    headless: false,
                                    ignoreHTTPSErrors: true,
                                    product: "firefox",
                                    executablePath: executablePath(),
                                });

                                Users.sort((a, b) => {
                                    return a.ExecOrder - b.ExecOrder;
                                });

                                const context =
                                    await browser.createIncognitoBrowserContext();

                                for (
                                    var UsersIndex = 0;
                                    UsersIndex < Users.length;
                                    UsersIndex++
                                ) {
                                    console.log("⚠️INIZIO PERSONA");
                                    const page = await context.newPage();

                                    await page.setViewport({
                                        width: 1920,
                                        height: 1280,
                                        //deviceScaleFactor: 1,
                                    });

                                    await page.goto(bot.url, {
                                        waitUntil: "networkidle0",
                                    });

                                    console.log("hai aspettatto");
                                    const Persona = Users[UsersIndex];
                                    await page.waitForTimeout(10000);
                                    for (
                                        var CmdIndex = 0;
                                        CmdIndex < CmdList.length;
                                        CmdIndex++
                                    ) {
                                        await page.waitForTimeout(5000);
                                        await page.waitForTimeout(500);
                                        const Cmd = CmdList[CmdIndex];
                                        if (Cmd.TypeOfCmd == 1) {
                                            //WAIT
                                            console.log(
                                                "⚠️⚠️⚠️➡️ WAIT CMD 🕰️🕰️🕰️ => \n⚠️⚠️⚠️➡️ DESCRIPTION: " +
                                                    Cmd.CmdDescription +
                                                    "\n⚠️⚠️⚠️➡️ NAME: " +
                                                    Cmd.CmdName
                                            );
                                            await page.waitForTimeout(
                                                Cmd.Millisec
                                            );
                                        } else if (Cmd.TypeOfCmd == 2) {
                                            //CLICK
                                            console.log(
                                                "⚠️⚠️⚠️➡️ CLICK CMD ❎❎❎ => \n⚠️⚠️⚠️➡️ DESCRIPTION: " +
                                                    Cmd.CmdDescription +
                                                    "\n⚠️⚠️⚠️➡️ NAME: " +
                                                    Cmd.CmdName
                                            );
                                            try {
                                                if (Cmd.IsFormBtn) {
                                                    await page.keyboard.press(
                                                        "Enter"
                                                    );
                                                } else {
                                                    if (Cmd.isXPath) {
                                                        await page.waitForXPath(
                                                            Cmd.Selector
                                                        );
                                                        const [button] =
                                                            await page.$x(
                                                                Cmd.Selector
                                                            );
                                                        await button.click();
                                                    } else if (
                                                        Cmd.IsQuerySelector
                                                    ) {
                                                        await page.evaluate(
                                                            () => {
                                                                const button =
                                                                    document.querySelector(
                                                                        Cmd.Selector
                                                                    );
                                                                button.click();
                                                            }
                                                        );
                                                    } else {
                                                        const element =
                                                            await page.waitForSelector(
                                                                Cmd.Selector
                                                            );
                                                        await element.click();
                                                    }
                                                }
                                            } catch {
                                                console.log(
                                                    "Selector not find, i try to press enter key"
                                                );
                                                await page.keyboard.press(
                                                    "Enter"
                                                );
                                            }
                                        } else if (Cmd.TypeOfCmd == 3) {
                                            var Configuration =
                                                ConfigList.filter((c) => {
                                                    return (
                                                        c.SelectorId == Cmd.id
                                                    );
                                                });

                                            let value =
                                                Persona[
                                                    Configuration[0]
                                                        .NomeCampoUtente
                                                ];

                                            //if (Configuration[0].NomeCampoUtente.includes("email")) {
                                            //  value = value + "@1secmail.com";
                                            //}

                                            //TYPE
                                            console.log(
                                                "⚠️⚠️⚠️➡️ TYPE CMD 🖊️🖊️🖊️ => \n⚠️⚠️⚠️➡️ DESCRIPTION: " +
                                                    Cmd.CmdDescription +
                                                    "\n⚠️⚠️⚠️➡️ NAME: " +
                                                    Cmd.CmdName
                                            );

                                            await page.waitForSelector(
                                                Cmd.Selector
                                            );
                                            await page.type(
                                                Cmd.Selector,
                                                value,
                                                { delay: Cmd.Millisec }
                                            );
                                        } else {
                                            console.log(
                                                "ERROR - Campo inesistente"
                                            );
                                        }
                                        await page.waitForTimeout(5000);
                                    }

                                    console.log("⚠️FINE PERSONA");
                                    page.close();
                                }
                            }
                        }
                    );
                }
            });
        }
    });

    // Launch sequence

    //CMD LIST:
    //1: await page.waitForTimeout(Millisec) param => Millisec (5000)
    //2: await page.click('Selector"]', (btn) => btn.click()); param => Selector(a[href="https://webscraper.io/test-sites/e-commerce/static/product/491"])
    //3: await page.type("Selector", "Value", { delay: Delay }) param => Selector(#username),Delay(250)
};
