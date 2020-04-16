import { WebDriver, WebElement, By, until, error } from "selenium-webdriver";

export default class FindOperation {
    private readonly driver: WebDriver;
    private readonly by: By;
    private timeout: number = 100;

    constructor(driver: WebDriver, by: By) {
        this.driver = driver;
        this.by = by;
    }

    withTimeout(timeout: number): FindOperation {
        this.timeout = timeout;
        return this;
    }

    present(): Promise<WebElement> {
        return this.driver.wait(until.elementLocated(this.by), this.timeout);
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
}
