import Page from "./Page";
import Tools from "../utils/Tools";
import { WebElement } from "selenium-webdriver"

export default class PageFragment extends Page {

    protected root: WebElement;

    public constructor(tools: Tools, root: WebElement) {
        super(tools);
        this.root = root;
    }
}
