import Page from "./Page";
import Tools from "../utils/Tools";
import Element from "./Element";

export default abstract class PageFragment extends Page {

    protected readonly root: Element;

    public constructor(tools: Tools, root: Element) {
        super(tools);
        this.root = root;
    }
}
