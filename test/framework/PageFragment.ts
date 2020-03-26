import Page from "./Page";
import Tools from "../utils/Tools";
import { WebElement } from "selenium-webdriver"

export default class PageFragment extends Page {

    protected parent: WebElement;

    constructor(tools: Tools, parent: WebElement) {
        super(tools);
        this.parent = parent;
    }
}
