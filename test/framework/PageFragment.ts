import Page from "./Page";
import Tools from "../utils/Tools";
import { WebElement } from "selenium-webdriver"

export default abstract class PageFragment extends Page {

    protected readonly root: WebElement;

    public constructor(tools: Tools, root: WebElement) {
        super(tools);
        this.root = root;
    }
}
