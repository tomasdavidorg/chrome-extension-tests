import PageFragment from "../PageFragment";

export default abstract class Editor extends PageFragment {

    public async enter(): Promise<void> {
        await this.root.enterFrame();
    }

    public async leave(): Promise<void> {
        await this.tools.window().leaveFrame();
    }
}
