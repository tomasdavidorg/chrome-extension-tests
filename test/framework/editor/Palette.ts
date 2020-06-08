import { By } from "selenium-webdriver";
import PageFragment from "../PageFragment";

export default class Palette extends PageFragment {

    private static readonly LOCATOR = By.className("kie-palette");

    public async waitUntilLoaded(): Promise<void> {
        await this.tools.by(Palette.LOCATOR).wait(1000).untilPresent();
    }
}
