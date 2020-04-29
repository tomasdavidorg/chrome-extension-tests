import { WebDriver, WebElement, By, until, error } from "selenium-webdriver";
import DriverTool from "./DriverTool";

export default class ByOperation extends DriverTool {
    private readonly by: By;
    private timeout: number = 100;

    constructor(driver: WebDriver, by: By) {
        super(driver);
        this.by = by;
    }

    public withTimeout(timeout: number): ByOperation {
        this.timeout = timeout;
        return this;
    }

    public async getWebElement(): Promise<WebElement> {
        return await this.driver.wait(until.elementLocated(this.by), this.timeout);
    }

    public async getWebElements(): Promise<WebElement[]> {
        return await this.driver.wait(until.elementsLocated(this.by), this.timeout);
    }

    public async present(): Promise<void> {
        await this.getWebElement();
    }

    public async isPresent(): Promise<boolean> {
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

    public async absent(): Promise<void> {
        await this.driver.wait(async () => (await this.driver.findElements(this.by)).length == 0, this.timeout);
    }

    public async isAbsent(): Promise<boolean> {
        try {
            await this.absent();
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
