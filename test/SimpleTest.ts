import { ThenableWebDriver, Browser, Builder, Capabilities, By, until, WebElement } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";


describe("Simple test", () => {

 /*   let driver: ThenableWebDriver;

    before(() => {
        const chromeExtensionPath = process.env.CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            throw new Error("Please set CHROME_EXTENSION_PATH variable to unziped chrome extension directory.");
        }

        let chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath)

        // initializing chrome driver
        driver = new Builder()
        //    .setChromeOptions(chromeOptions)
            .forBrowser(Browser.CHROME)
            .withCapabilities(Capabilities.chrome())
            .build();

        // maximizing chrome browser
        driver.manage().window().maximize();
    });
*/

    it("should test", () => {
        const chromeExtensionPath = process.env.CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            throw new Error("Please set CHROME_EXTENSION_PATH variable to unziped chrome extension directory.");
        }

        let chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath)

        let driver =  new Builder()
            .setChromeOptions(chromeOptions)
            .forBrowser(Browser.CHROME)
            .withCapabilities(Capabilities.chrome())
            .build();

             driver.get("https://github.com/kiegroup/kie-wb-playground/blob/master/evaluation/src/main/resources/");
             driver.findElement(By.linkText("evaluation.bpmn")).click();

        let kogitoFrame =   driver.wait(until.elementLocated(By.className("kogito-iframe")), 2000);
         driver.switchTo().frame(kogitoFrame);

          driver.wait(until.elementLocated(By.className("fa-eye")), 30000);

         driver.switchTo().defaultContent();
         driver.quit();

    }).timeout(60000);
/*
    after(() => {
        if (driver != undefined) {
            driver.quit();
        }
    });
    */
})
