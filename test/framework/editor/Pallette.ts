import PageFragment from "../PageFragment";
import { By } from "selenium-webdriver";

export default class Pallette extends PageFragment {

    private readonly START_EVENTS_LOCATOR = By.xpath("//button[@title='Start Events']");
    private readonly START_ITEM_LOCATOR = By.xpath("//a[@class='kie-palette-item-anchor-spacer'][span[text()='Start']]");
    private readonly CLOSE_PALLETTE_LOCATOR = By.className("kie-palette-flyout__btn-link--close");

    async dragAndDropStartEventToCanvas() {
        // open start events
        const startEvent = await this.tools.by(this.START_EVENTS_LOCATOR).getWebElement();
        await startEvent.click();

        // select start item
        const startItem = await this.tools.by(this.START_ITEM_LOCATOR).getWebElement();
        await startItem.click();

        // move to canvas
        // no other way of drag and drop does not work
        const actions = await this.tools.driver.actions();
        await actions.move({ origin: startEvent, x: 200, y: 0 }).perform();
        await actions.click().perform();

        // close start events pallette
        await (await this.tools.by(this.CLOSE_PALLETTE_LOCATOR).getWebElement()).click();

    }
}