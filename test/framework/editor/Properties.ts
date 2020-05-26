import PageFrament from "../PageFragment";
import { By } from "selenium-webdriver";
import Element from "../Element";

export default class Properties extends PageFrament {

    private static readonly LABEL_LOCATOR = By.xpath("//h3[text()='Properties']");

    public async waitUntilLoaded(): Promise<void> {
        this.tools.by(Properties.LABEL_LOCATOR).wait(1000).untilPresent();
    }

    private getProperty(type: string, nameAttributeSuffix: string): By {
        return By.xpath(`//${type}[contains(@name, '${nameAttributeSuffix}')]`);
    }

    private async getValue(type: string, nameAttributeSuffix: string): Promise<string> {
        const property: Element = await this.tools.by(this.getProperty(type, nameAttributeSuffix))
            .wait(2000)
            .untilHasValue();
        return await property.getAttribute("value");
    }

    public async getNameFromTextArea(): Promise<string> {
        return await this.getValue("textarea", ".general.name");
    }

    public async getProcessNameFromInput(): Promise<string> {
        return await this.getValue("input", "diagramSet.name");
    }

    public async getDmnNameFromInput(): Promise<string> {
        return await this.getValue("input", ".nameHolder");
    }
}
