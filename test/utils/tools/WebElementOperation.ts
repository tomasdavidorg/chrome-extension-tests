import { WebDriver, WebElement, By, until, error } from "selenium-webdriver"

export default class WebElementOperation {

    private readonly driver: WebDriver;
    private readonly webElement: WebElement;
    private timeout: number = 100;

    public constructor(driver: WebDriver, webElement: WebElement) {
        this.driver = driver;
        this.webElement = webElement;
    }

    public withTimeout(timeout: number): WebElementOperation {
        this.timeout = timeout;
        return this;
    }

    public async find(by: By): Promise<WebElement> {
        await this.driver.wait(async () => (await this.webElement.findElements(by)).length == 1, this.timeout);
        return await this.webElement.findElement(by);
    }

    public async enabled(): Promise<void> {
        await this.driver.wait(until.elementIsEnabled(this.webElement), this.timeout);
    }

    public async visible(): Promise<void> {
        await this.driver.wait(until.elementIsVisible(this.webElement), this.timeout);
    }

    public async hasValue(): Promise<void> {
        await this.driver.wait(async () => (await this.webElement.getAttribute("value")) !== "", this.timeout);
    }

    public async isVisible(): Promise<boolean> {
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

    public async scroll(): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.webElement);
    }
}
