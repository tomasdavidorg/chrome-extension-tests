import { WebDriver } from "selenium-webdriver";
export default class Wait {

    private readonly driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    pause(timeout: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
}
