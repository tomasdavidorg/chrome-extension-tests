import { WebDriver, Browser, Builder, Capabilities, By, until, WebElement } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";
import * as fs from "fs";
import { performance } from 'perf_hooks';

describe("Simple test", () => {

    let driver: WebDriver;

    before(async() => {
        // get path to unzipped extension
        const chromeExtensionPath = process.env.UNZIPPED_CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            throw new Error("Please set UNZIPPED_CHROME_EXTENSION_PATH variable to unziped Chrome extension directory.");
        }

        // init chrome options
        let chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath)

        // initializing chrome driver
        driver = await new Builder()
            //.withCapabilities(Capabilities.chrome())
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        // maximizing chrome browser
         await driver.manage().window().maximize();

        if (!fs.existsSync("screenshots")) {
            fs.mkdirSync("screenshots");
        }
    });


    it("should test", async () => {
        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");

        await delay(2000);

        await driver.takeScreenshot().then((image) => {
            fs.writeFileSync("screenshots/screenshot-list.png", image, "base64");
        })

        await driver.findElement(By.linkText("evaluation.bpmn")).click();

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);

        await delay(2000);

        await driver.takeScreenshot().then((image) => {
            fs.writeFileSync("screenshots/screenshot-editor.png", image, "base64");
        })

        await driver.executeScript("arguments[0].scrollIntoView(true)", kogitoFrame)

        await driver.switchTo().frame(kogitoFrame);

        let startTime = performance.now();
        await driver.wait(until.elementLocated(By.className("fa-eye")), 25000);
        let endTime = performance.now();
        console.log("Plugin was loaded in " + (endTime - startTime));

        await driver.switchTo().defaultContent();
    })

    after(async() => {
        await driver.switchTo().defaultContent();

        let pageSource = await driver.getPageSource()
        fs.writeFileSync("screenshots/screenshot.html", pageSource, "utf8");

        await driver.takeScreenshot().then((image) => {
            fs.writeFileSync("screenshots/screenshot.png", image, "base64");
        })

        await driver.quit();
    });

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
})
