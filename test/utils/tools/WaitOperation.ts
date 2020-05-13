import { By, WebDriver, error, until } from "selenium-webdriver";

export default class WaitOperation {

    private static readonly DEFAULT_TIMEOUT: number = 100;

    private readonly driver: WebDriver;
    private readonly by: By;
    private readonly timeout: number;

    public constructor(driver: WebDriver, by: By, timeout?: number) {
        this.driver = driver;
        this.by = by;
        this.timeout = timeout !== undefined ? timeout : WaitOperation.DEFAULT_TIMEOUT;
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

    public async untilPresent(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.by), this.timeout)
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
}
