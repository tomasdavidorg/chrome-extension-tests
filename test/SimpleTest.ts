import { WebDriver, Browser, Builder, Capabilities, By, until, WebElement } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";
import * as fs from "fs";

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
            .setChromeOptions(chromeOptions)
            .forBrowser(Browser.CHROME)
            .withCapabilities(Capabilities.chrome())
            .build();

        // maximizing chrome browser
        await driver.manage().window().maximize();
    });


    it("should test", async () => {
        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");
        await driver.findElement(By.linkText("evaluation.bpmn")).click();

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);
        await driver.switchTo().frame(kogitoFrame);

        await driver.wait(until.elementLocated(By.className("fa-eye")), 50000);

        await driver.switchTo().defaultContent();
    }).timeout(100000);

    after(async() => {
        await driver.takeScreenshot().then((image) => {
            fs.writeFileSync("screenshot.png", image, "base64")
        })

        await driver.quit();
    });
})
