import { until, By, WebDriver, WebElementPromise } from "selenium-webdriver";

export default class Wait {

    driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    pause(timeout: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    untilElementIsPresent(by: By, timeout: number): WebElementPromise {
        return this.driver.wait(until.elementLocated(by), timeout);
    }
}