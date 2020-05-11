import Pallette from "../Palette";
import { By } from "selenium-webdriver";

export default class DmnPallette extends Pallette {

    private static readonly ANNOTATION_LOCATOR: By = By.xpath("//button[@title='DMN Text Annotation']");

    public async dragAndDropAnnotationToCanvas(): Promise<void> {

        // click annotation
        const annotation = await this.tools.by(DmnPallette.ANNOTATION_LOCATOR).getWebElement();
        await annotation.click();

        // move to canvas
        // no other way of drag and drop does not work
        const actions = await this.tools.driver.actions();
        await actions.move({ origin: annotation, x: 200, y: 0 }).perform();
        await actions.click().perform();

        // click to canvas
        await actions.move({ origin: annotation, x: 100, y: 0 }).perform();
        await actions.click().perform();
    }
}
