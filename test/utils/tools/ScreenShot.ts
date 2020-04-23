import { WebDriver } from "selenium-webdriver"
import * as fs from "fs";
import * as path from "path"
import DriverTool from "./DriverTool";

export default class Screenshots extends DriverTool {
    
    private screenshotsDir: string;

    constructor(driver: WebDriver, screenshotsDir: string) {
        super(driver);
        this.screenshotsDir = screenshotsDir;

        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }
    }

    async takePng(fileName: string) {
        let pngPath = path.join(this.screenshotsDir, fileName + ".png");
        await this.driver.takeScreenshot().then((image) => {
            fs.writeFileSync(pngPath, image, "base64");
        })
    }

    async takeHtml(fileName: string) {
        let pageSource = await this.driver.getPageSource();
        let htmlPath = path.join(this.screenshotsDir, fileName + ".html");
        fs.writeFileSync(htmlPath, pageSource, "utf8");
    }
}
