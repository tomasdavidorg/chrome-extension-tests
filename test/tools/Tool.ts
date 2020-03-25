import { WebDriver, WebElement, Key } from "selenium-webdriver";

export default class Tool {

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

    //await this.tools.driver.executeScript("arguments[0].style.backgroundColor = '#ff0000';", await this.parent.findElement(By.xpath(".//a")))  
    //await this.tools.wait.pause(2000)

}