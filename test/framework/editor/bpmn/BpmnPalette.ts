import Pallette from "../Palette";
import { By } from "selenium-webdriver";

export default class BpmnPalette extends Pallette {

    private static readonly START_EVENTS_LOCATOR = By.xpath("//button[@title='Start Events']");
    private static readonly START_ITEM_LOCATOR = By.xpath("//a[@class='kie-palette-item-anchor-spacer'][span[text()='Start']]");
    private static readonly CLOSE_LOCATOR = By.className("kie-palette-flyout__btn-link--close");

    public async dragAndDropStartEventToCanvas() {
        // open start events
        const startEvent = this.tools.by(BpmnPalette.START_EVENTS_LOCATOR)
        await startEvent.click();

        // select start item
        await this.tools.by(BpmnPalette.START_ITEM_LOCATOR).click();

        // move to canvas
        // no other way of drag and drop does not work
        const actions = await this.tools.driver.actions();
        await actions.move({ origin: await startEvent.getWebElement(), x: 200, y: 0 }).perform();
        await actions.click().perform();

        // close start events pallette
        await this.tools.by(BpmnPalette.CLOSE_LOCATOR).click();
    }

}