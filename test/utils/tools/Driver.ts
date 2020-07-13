import { Browser, Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options, ServiceBuilder } from "selenium-webdriver/chrome";
import { existsSync, mkdirSync } from "fs";
import ErrorProcessor from "./ErrorProcessor";
import { resolve } from "path";


export default class Driver {

    public static async init(): Promise<WebDriver> {
        // get path to unzipped extension
        let chromeExtensionPath = process.env.UNZIPPED_CHROME_EXTENSION_PATH;
        if (!chromeExtensionPath) {
            chromeExtensionPath = resolve("dist");
            console.debug("### Path to chrome extension:" + chromeExtensionPath);

            if (!existsSync(chromeExtensionPath)) {
                throw new Error("Please set UNZIPPED_CHROME_EXTENSION_PATH variable to unziped Chrome extension directory." +
                    "For example: export UNZIPPED_CHROME_EXTENSION_PATH=dist");
            }
        }

        // init chrome options
        const chromeOptions = new Options();
        chromeOptions.addArguments("--load-extension=" + chromeExtensionPath);

        // init chrome driver log
        const LOGS_DIR = "logs";
        if (!existsSync(LOGS_DIR)) {
            mkdirSync(LOGS_DIR);
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
        await ErrorProcessor.run(
            async() => {
                await driver.manage().window().maximize();
            },
            "Error while maximizing browser window."
        );

        return driver;
    }

    public static async openUrl(driver: WebDriver, url: string): Promise<void> {
        await ErrorProcessor.run(
            async () => {
                await driver.get(url);
            },
            "Error while opening url: " + url
        );
    }

    public static async quit(driver: WebDriver): Promise<void> {
        return await ErrorProcessor.run(
            async () => {
                await driver.quit();
            },
            "Error while quiting driver."
        );
    }
}
