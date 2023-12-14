import Control from "sap/ui/core/Control";
import BaseController from "./BaseController";
import MessageToast from "sap/m/MessageToast";
import Dialog from "sap/m/Dialog";

/**
 * @namespace myapp.controller
 */
export default class Main extends BaseController {
    private pDialog: Promise<Control | Control[]> 

	async onShowHello(): Promise<void> {
        // read msg from i18n model
        const oBundle = await this.getResourceBundle();
        const sRecipient = this.getView().getModel().getProperty("/recipient/name");
        const sMsg = oBundle.getText("helloMsg", [sRecipient]);

        // show message
        MessageToast.show(sMsg);
    }

    onOpenDialog() {
        // create dialog lazily
        this.pDialog??= this.loadFragment({
            name: "myapp.view.HelloDialog"
        });
    
        this.pDialog.then((oDialog: any) => oDialog.open());
    }

    onCloseDialog() {
        // note: We don't need to chain to the pDialog promise, since this event handler
        // is only called from within the loaded dialog itself.
        const dialog = this.byId("helloDialog") as Dialog;
        dialog.close();
    }
}
