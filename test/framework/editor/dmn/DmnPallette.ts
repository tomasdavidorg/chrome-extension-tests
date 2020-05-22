import Pallette from "../Palette";
import { By } from "selenium-webdriver";

export default class DmnPallette extends Pallette {

    private static readonly ANNOTATION_LOCATOR: By = By.xpath("//button[@title='DMN Text Annotation']");

    public async dragAndDropAnnotationToCanvas(): Promise<void> {

        // click annotation
        const annotation = await this.tools.by(DmnPallette.ANNOTATION_LOCATOR).getElement();

        // move to canvas
        await annotation.dragAndDrop(200, 0);

        // click to canvas
        await annotation.offsetClick(100, 0);
    }
}
