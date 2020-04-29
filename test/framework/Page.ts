import Tools from "../utils/Tools";

export default abstract class Page {

    protected readonly tools: Tools;

    public constructor(tools: Tools) {
        this.tools = tools;
    }

    public abstract async load(): Promise<void>;
}
