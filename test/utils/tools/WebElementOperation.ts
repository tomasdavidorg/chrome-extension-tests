import { WebDriver, WebElement, By, until, error } from "selenium-webdriver"
import DriverTool from "./DriverTool";

export default class WebElementOperation extends DriverTool {

    private webElement: WebElement;
    private timeout: number = 100;

    constructor(driver: WebDriver, webElement: WebElement) {
        super(driver);
        this.webElement = webElement;
    }

    withTimeout(timeout: number): WebElementOperation {
        this.timeout = timeout;
        return this;
    }

    async find(by: By): Promise<WebElement> {
        await this.driver.wait(async () => (await this.webElement.findElements(by)).length == 1, this.timeout);
        return await this.webElement.findElement(by);
    }

    async enabled(): Promise<void> {
        await this.driver.wait(until.elementIsEnabled(this.webElement), this.timeout);
    }

    async visible(): Promise<void> {
        await this.driver.wait(until.elementIsVisible(this.webElement), this.timeout);
    }

    async hasValue(): Promise<void> {
        await this.driver.wait(async () => (await this.webElement.getAttribute("value")) !== "", this.timeout)
    }

    async isVisible(): Promise<boolean> {
        try {
            await this.visible();
            return true;
        } catch (err) {
            if (err instanceof error.TimeoutError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    async scroll(): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.webElement);
    }
}
