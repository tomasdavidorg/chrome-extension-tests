import PageFragment from "../PageFragment";
import { By } from "selenium-webdriver";
import { performance } from "perf_hooks";

export default class Editor extends PageFragment {

    private readonly TOOLS_LOCATOR: By = By.className("fa-eye");

    public async enter(): Promise<void> {
        await this.tools.driver.switchTo().frame(this.root);
    }

    public async leave(): Promise<void> {
        await this.tools.driver.switchTo().defaultContent();
    }

    public async load(): Promise<void> {
        await this.enter();

        let startTime = performance.now();
        await this.tools.find(this.TOOLS_LOCATOR).withTimeout(25000).present();
        let endTime = performance.now();
        console.log("Plugin was loaded in " + (endTime - startTime));
        
        await this.leave();
    }
}
