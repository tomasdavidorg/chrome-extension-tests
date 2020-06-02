import { By, WebDriver, error, until } from "selenium-webdriver";
import Element from "./Element";
import ErrorProcessor from "../utils/tools/ErrorProcessor";

export default class LocatorWaitAction {

    private static readonly DEFAULT_TIMEOUT: number = 100;

    private readonly driver: WebDriver;
    private readonly by: By;
    private readonly timeout: number;

    public constructor(driver: WebDriver, by: By, timeout?: number) {
        this.driver = driver;
        this.by = by;
        this.timeout = timeout !== undefined ? timeout : LocatorWaitAction.DEFAULT_TIMEOUT;
    }

    public async untilAbsent(): Promise<void> {
        await this.driver.wait(async () => (await this.driver.findElements(this.by)).length == 0, this.timeout);
    }

    public async isAbsent(): Promise<boolean> {
        try {
            await this.untilAbsent();
            return true;
        } catch (err) {
            if (err instanceof error.TimeoutError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    public async untilPresent(): Promise<Element> {
        return await ErrorProcessor.run(
            async () => {
                return new Element(await this.driver.wait(until.elementLocated(this.by), this.timeout));
            },
            "Error while waiting until element is present: " + this.by 
        );
    }

    public async isPresent(): Promise<boolean> {
        try {
            await this.untilPresent();
            return true;
        } catch (err) {
            if (err instanceof error.TimeoutError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    public async untilVisible(): Promise<void> {
        const webElement = await this.driver.findElement(this.by);
        await this.driver.wait(until.elementIsVisible(webElement), this.timeout);
    }

    public async isVisible(): Promise<boolean> {
        try {
            await this.untilVisible();
            return true;
        } catch (err) {
            if (err instanceof error.TimeoutError) {
                return false;
            } else {
                throw err;
            }
        }
    }

    public async untilHasValue(): Promise<Element> {
        const webElement = await this.driver.findElement(this.by);
        await this.driver.wait(async () => (await webElement.getAttribute("value")) !== "", this.timeout);
        return new Element(webElement);
    }
}
