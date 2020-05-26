import { By } from "selenium-webdriver";
import DecisionNavigator from "./DecisionNavigator";
import SideBar from "../SideBar";

export default class DmnSideBar extends SideBar {

    private static readonly NAVIGATOR_BUTTON_LOCATOR: By = By.xpath(".//button[@data-title='Decision Navigator']");

    public async openDecisionNavigator(): Promise<DecisionNavigator> {
        const navigatorButton = await this.tools.by(DmnSideBar.NAVIGATOR_BUTTON_LOCATOR).getElement();
        const sideBar = await this.openSideBar(navigatorButton);
        return this.tools.createPageFragment(DecisionNavigator, sideBar);
    }
}
