import { WebDriver, Builder, Capabilities, By, until, Browser } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/chrome'
import { Options } from "selenium-webdriver/chrome";
import { performance } from 'perf_hooks';
import { Screenshots } from "./tools/Screenshots"
import { Wait } from "./tools/Wait"
import { expect } from "chai";

describe("Simple test", () => {

    let driver: WebDriver;
    let screenshots: Screenshots;
    let wait: Wait;

    before(async () => {
        // get path to unzipped extension
        const chromeExtensionPath = process.env.UNZIPPED_CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            throw new Error("Please set UNZIPPED_CHROME_EXTENSION_PATH variable to unziped Chrome extension directory." +
                "For example: export UNZIPPED_CHROME_EXTENSION_PATH=dist");
        }

        // init chrome options
        let chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath);

        let chromeServiceBuilder = new ServiceBuilder();

        chromeServiceBuilder.loggingTo("chromedriver.log").enableVerboseLogging()

        // initializing chrome driver
        driver = await new Builder()
            .withCapabilities(Capabilities.chrome())
            .setChromeService(chromeServiceBuilder)
            .forBrowser(Browser.CHROME)
            .setChromeOptions(chromeOptions)
            .build();

        screenshots = new Screenshots(driver, "screenshots");

        wait = new Wait(driver);

        // maximizing chrome browser
        await driver.manage().window().maximize();
    });


    it("should test", async () => {
        await driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");

        let linkToOnlineEditr = await driver.wait(until.elementLocated(By.xpath("//a[@title='Open in Online Editor']")), 2000);

        let linkText = await linkToOnlineEditr.getAttribute("href"); 
        expect(linkText).contain("/kiegroup/kie-wb-playground/master/evaluation/src/main/resources/evaluation.bpmn")

        await driver.findElement(By.linkText("evaluation.bpmn")).click();

        let seeAsSourceButton = await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='see-as-source-button']")), 2000);

        await driver.wait(until.elementIsEnabled(seeAsSourceButton), 25000);

        let kogitoFrame = await driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);

        await driver.executeScript("arguments[0].scrollIntoView(true)", kogitoFrame)

        await driver.switchTo().frame(kogitoFrame);

        let startTime = performance.now();
        await driver.wait(until.elementLocated(By.className("fa-eye")), 25000);
        let endTime = performance.now();

        console.log("Plugin was loaded in " + (endTime - startTime));

        await driver.switchTo().defaultContent();

        await wait.pause(5000);
    })

    afterEach(async ()=> {
        await driver.switchTo().defaultContent();
        await screenshots.takeHtml("screenshot_after_test");
        await screenshots.takePng("screenshot_after_test");
    });

    after(async () => {
        await driver.quit();
    });
})
