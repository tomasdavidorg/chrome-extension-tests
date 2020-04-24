import { WebDriver, WebElement, By, until, error } from "selenium-webdriver";
import DriverTool from "./DriverTool";

export default class ByOperation extends DriverTool {
    private readonly by: By;
    private timeout: number = 100;

    constructor(driver: WebDriver, by: By) {
        super(driver)
        this.by = by;
    }

    withTimeout(timeout: number): ByOperation {
        this.timeout = timeout;
        return this;
    }

    async getWebElement(): Promise<WebElement> {
        return await this.driver.wait(until.elementLocated(this.by), this.timeout);
    }

    async getWebElements(): Promise<WebElement[]> {
        return await this.driver.wait(until.elementsLocated(this.by), this.timeout);
    }

    async present(): Promise<void> {
        await this.getWebElement();
    }

    async isPresent(): Promise<boolean> {
        try {
            await this.present();
            return true;
        } catch (err) {
            if (err instanceof error.TimeoutError) {
                return false;
            } else {
                throw err;
            }
        }
    }
}
