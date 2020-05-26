import Pallette from "../Palette";
import { By } from "selenium-webdriver";
import Element from "../../Element";

export default class BpmnPalette extends Pallette {

    private static readonly START_EVENTS_LOCATOR = By.xpath("//button[@title='Start Events']");
    private static readonly START_ITEM_LOCATOR = By.xpath("//a[@class='kie-palette-item-anchor-spacer'][span[text()='Start']]");
    private static readonly CLOSE_LOCATOR = By.className("kie-palette-flyout__btn-link--close");

    public async dragAndDropStartEventToCanvas() {
        // open start events
        const startEvents: Element = await this.tools.by(BpmnPalette.START_EVENTS_LOCATOR).getElement()
        await startEvents.click();

        // select start item
        const startItem = await this.tools.by(BpmnPalette.START_ITEM_LOCATOR).getElement();

        // move to canvas
        await startItem.dragAndDrop(200, 0);

        // close start events pallette
        const closeButton: Element = await this.tools.by(BpmnPalette.CLOSE_LOCATOR).getElement();
        await closeButton.click();
    }

}