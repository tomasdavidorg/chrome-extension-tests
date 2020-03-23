import { WebDriver, WebElement, Key } from "selenium-webdriver";

export class Tool {

    driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async getClipboarContent() {
        const ADD_HELPER_INPUT_CMD: string = "input=document.createElement('input');" +
            "input.setAttribute('id','copyPaste');" +
            "return document.getElementsByTagName('body')[0].appendChild(input)";
        const GET_TEXT_FROM_INPUT_CML: string = "input=document.getElementById('copyPaste');" +
            "text=document.getElementById('copyPaste').value;" +
            "input.remove();" +
            "return text;"
        const input: WebElement = await this.driver.executeScript(ADD_HELPER_INPUT_CMD);
        await input.sendKeys(Key.CONTROL + "v");
        return await this.driver.executeScript(GET_TEXT_FROM_INPUT_CML);
    }

}