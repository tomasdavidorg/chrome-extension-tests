import PageFragment from "../PageFragment";
import { By } from "selenium-webdriver";

export default class Pallette extends PageFragment {

    private static readonly LOCATOR = By.className("kie-palette");

    public async load(): Promise<void> {
        await this.tools.by(Pallette.LOCATOR).withTimeout(1000).present();
    }
}