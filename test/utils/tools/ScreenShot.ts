import { WebDriver } from "selenium-webdriver";
import * as fs from "fs";
import * as path from "path";

export default class Screenshots {

    private readonly driver: WebDriver;
    private readonly screenshotsDir: string;

    constructor(driver: WebDriver, screenshotsDir: string) {
        this.driver = driver;
        this.screenshotsDir = screenshotsDir;

        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }
    }

    public async takePng(fileName: string): Promise<void> {
        const pngPath = path.join(this.screenshotsDir, fileName + ".png");
        await this.driver.takeScreenshot().then((image) => {
            fs.writeFileSync(pngPath, image, "base64");
        });
    }

    public async takeHtml(fileName: string): Promise<void> {
        const pageSource = await this.driver.getPageSource();
        const htmlPath = path.join(this.screenshotsDir, fileName + ".html");
        fs.writeFileSync(htmlPath, pageSource, "utf8");
    }
}
