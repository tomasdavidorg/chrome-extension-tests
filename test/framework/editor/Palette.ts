import { By } from "selenium-webdriver";
import PageFragment from "../PageFragment";

export default class Pallette extends PageFragment {

    private static readonly LOCATOR = By.className("kie-palette");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(Pallette.LOCATOR).wait(1000).untilPresent();
    }
}
