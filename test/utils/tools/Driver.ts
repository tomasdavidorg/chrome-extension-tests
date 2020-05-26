import * as fs from "fs";
import { Browser, Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome";


export default class Driver {

    public static async init(): Promise<WebDriver> {
        // get path to unzipped extension
        const chromeExtensionPath = process.env.UNZIPPED_CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            throw new Error("Please set UNZIPPED_CHROME_EXTENSION_PATH variable to unziped Chrome extension directory." +
                "For example: export UNZIPPED_CHROME_EXTENSION_PATH=dist");
        }

        // init chrome options
        const chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath);

        // init chrome driver log
        const LOGS_DIR = "logs";
        if (!fs.existsSync(LOGS_DIR)) {
            fs.mkdirSync(LOGS_DIR);
        }
        const chromeServiceBuilder = new ServiceBuilder();
        chromeServiceBuilder.loggingTo(LOGS_DIR + "/chromedriver.log").enableVerboseLogging();

        // init chrome driver
        const driver: WebDriver = await new Builder()
            .withCapabilities(Capabilities.chrome())
            .setChromeService(chromeServiceBuilder)
            .forBrowser(Browser.CHROME)
            .setChromeOptions(chromeOptions)
            .build();

        // maximize chrome browser window
        await driver.manage().window().maximize();

        return driver;
    }
}
