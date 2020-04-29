import PageFragment from "../PageFragment";
import { By } from "selenium-webdriver";

export default class Pallette extends PageFragment {

    private static readonly LOCATOR = By.className("kie-palette");
    private static readonly START_EVENTS_LOCATOR = By.xpath("//button[@title='Start Events']");
    private static readonly START_ITEM_LOCATOR = By.xpath("//a[@class='kie-palette-item-anchor-spacer'][span[text()='Start']]");
    private static readonly CLOSE_LOCATOR = By.className("kie-palette-flyout__btn-link--close");

    public async load(): Promise<void> {
        await this.tools.by(Pallette.LOCATOR).withTimeout(1000).present();
    }

    async dragAndDropStartEventToCanvas() {
        // open start events
        const startEvent = await this.tools.by(Pallette.START_EVENTS_LOCATOR).getWebElement();
        await startEvent.click();

        // select start item
        const startItem = await this.tools.by(Pallette.START_ITEM_LOCATOR).getWebElement();
        await startItem.click();

        // move to canvas
        // no other way of drag and drop does not work
        const actions = await this.tools.driver.actions();
        await actions.move({ origin: startEvent, x: 200, y: 0 }).perform();
        await actions.click().perform();

        // close start events pallette
        await (await this.tools.by(Pallette.CLOSE_LOCATOR).getWebElement()).click();

    }
}