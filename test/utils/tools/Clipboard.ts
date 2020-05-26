import * as os from "os";
import { Key, WebDriver, WebElement } from "selenium-webdriver";

export default class Clipboard {

    private readonly driver: WebDriver;

    public constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async getContent(): Promise<string> {
        const ADD_HELPER_INPUT_CMD: string = "input=document.createElement('input');" +
            "input.setAttribute('id','copyPaste');" +
            "return document.getElementsByTagName('body')[0].appendChild(input)";
        const GET_TEXT_FROM_INPUT_CMD: string = "input=document.getElementById('copyPaste');" +
            "text=document.getElementById('copyPaste').value;" +
            // "input.remove();" +
            "return text;";

        // add hepler input to document
        const input: WebElement = await this.driver.executeScript(ADD_HELPER_INPUT_CMD);

        // paste content of clipboard to the input
        if (os.platform() == "darwin") {   // MacOS          
            await input.sendKeys(Key.SHIFT + Key.INSERT);
        } else {
            await input.sendKeys(Key.CONTROL + "v");
        }

        // get text from input
        return await this.driver.executeScript(GET_TEXT_FROM_INPUT_CMD);
    }

    //await this.tools.driver.executeScript("arguments[0].style.backgroundColor = '#ff0000';", await this.parent.findElement(By.xpath(".//a")))  
    //await this.tools.wait.pause(2000);

}
