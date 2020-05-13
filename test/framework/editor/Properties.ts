import PageFrament from "../PageFragment";
import { WebElement, By } from "selenium-webdriver";

export default class Properties extends PageFrament {

    private static readonly LABEL_LOCATOR = By.xpath("//h3[text()='Properties']");

    public async load(): Promise<void> {
        this.tools.by(Properties.LABEL_LOCATOR).wait(1000).untilPresent();
    }

    private async getProperty(type: string, nameAttributeSuffix: string): Promise<WebElement> {
        const textAreaLocator = By.xpath(`//${type}[contains(@name, '${nameAttributeSuffix}')]`);
        return await this.tools.by(textAreaLocator).getWebElement();
    }

    private async getValue(type: string, nameAttributeSuffix: string): Promise<string> {
        const property = await this.getProperty(type, nameAttributeSuffix);
        await this.tools.webElement(property).withTimeout(2000).hasValue();
        return await property.getAttribute("value");
    }

    public async getNameFromTextArea(): Promise<string> {
        return await this.getValue("textarea", ".general.name");
    }

    public async getProcessNameFromInput(): Promise<string> {
        return await this.getValue("input", "diagramSet.name");
    }

    public async getDmnNameFromInput(): Promise<string> {
        return await this.getValue("input", ".nameHolder")
    }
}