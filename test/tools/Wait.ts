import { WebDriver } from "selenium-webdriver";

export default class Wait {

    driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async pause(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}