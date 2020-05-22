import Tools from "../utils/Tools";
import Element from "./Element";

export default abstract class PageFragment {

    protected readonly tools: Tools;
    protected readonly root: Element;
    
    public constructor(tools: Tools, root: Element) {
        this.tools = tools;
        this.root = root;
    }

    public abstract async load(): Promise<void>;

    public static async create<T extends PageFragment>(type: { new(tools: Tools, root: Element): T }, tools: Tools, root: Element): Promise<T> {
        const pageFragment = new type(tools, root);
        await pageFragment.load();
        return pageFragment;
    }
}
