import Tools from "../utils/Tools";

export default abstract class Page {

    protected readonly tools: Tools;

    public constructor(tools: Tools) {
        this.tools = tools;
    }

    public static async create<T extends Page>(type: { new(tools: Tools): T }, tools: Tools ): Promise<T> {
        const page: T = new type(tools);
        await page.load();
        return page;
    }

    public abstract async load(): Promise<void>;
}
