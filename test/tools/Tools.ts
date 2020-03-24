import { WebDriver } from "selenium-webdriver"
import Wait from "./Wait"
import Screenshot from "./Screenshots"

export default class Tools {

    private static readonly SCREENSHOTS_DIR: string = "screenshots";

    private driver: WebDriver; 

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public wait(): Wait {
        return new Wait(this.driver);
    }

    public screenshot(): Screenshot {
        return new Screenshot(this.driver, Tools.SCREENSHOTS_DIR);
    }
}
