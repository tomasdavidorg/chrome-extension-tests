import { WebDriver, Browser, Builder, Capabilities, By, until, WebElement } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";
import * as fs from "fs";
import { performance } from 'perf_hooks';

describe("Simple test", () => {

    let driver: WebDriver;

    beforeEach(async() => {
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
        // wait until editor is loaded
console.log("Start:" + performance.now());
await delay(120000);
console.log("End:" + performance.now());

        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");

        await driver.wait(until.elementLocated(By.xpath("//a[@title='Open in Online Editor']")), 2000);

        await driver.findElement(By.linkText("evaluation.bpmn")).click();
        

        let seeAsSourceButton = await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='see-as-source-button']")), 2000);
  
   

        await driver.wait(until.elementIsEnabled(seeAsSourceButton), 25000);

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 5000);

       // await driver.executeScript("arguments[0].scrollIntoView(true)", kogitoFrame)

        await driver.switchTo().frame(kogitoFrame);

        let pageSource = await driver.getPageSource()
        

        let startTime = performance.now();
        await driver.wait(until.elementLocated(By.className("fa-eye")), 25000);
        let endTime = performance.now();
        console.log("Plugin was loaded in " + (endTime - startTime));
        delay(5000)
        fs.writeFileSync("screenshots/screenshot-frame.html", pageSource, "utf8");
        await driver.switchTo().defaultContent();
    })

    afterEach(async() => {
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
