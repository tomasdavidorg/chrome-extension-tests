import { WebDriver, WebElement, Key } from "selenium-webdriver";

export default class Clipboard {

    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async getContent(): Promise<string> {
        const ADD_HELPER_INPUT_CMD: string = "input=document.createElement('input');" +
            "input.setAttribute('id','copyPaste');" +
            "return document.getElementsByTagName('body')[0].appendChild(input)";
        const GET_TEXT_FROM_INPUT_CMD: string = "input=document.getElementById('copyPaste');" +
            "text=document.getElementById('copyPaste').value;" +
           // "input.remove();" +
            "return text;"
        const GET_PLATFORM_CMD: string = "return window.navigator.platform;"

        // add hepler input to document
        const input: WebElement = await this.driver.executeScript(ADD_HELPER_INPUT_CMD);

        // get os platform
        const platform: string = await this.driver.executeScript(GET_PLATFORM_CMD);
        console.log("Platform is: " + platform);

        // paste content of clipboard to the input
        if (platform.includes("Mac")) {
            console.log("running cmd+v");
            
            await input.sendKeys(Key.COMMAND + "v");
        } else {
            await input.sendKeys(Key.CONTROL + "v");
        }

        // get text from input
        return await this.driver.executeScript(GET_TEXT_FROM_INPUT_CMD);
    }

    //await this.tools.driver.executeScript("arguments[0].style.backgroundColor = '#ff0000';", await this.parent.findElement(By.xpath(".//a")))  
    //await this.tools.wait.pause(2000)

}