import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace myapp.controller
 */
export default class Main extends BaseController {

	public async onShowHello(): Promise<void> {
		// read msg from i18n model
		const oBundle = await this.getResourceBundle();
		const sRecipient = this.getView().getModel().getProperty("/recipient/name");
		const sMsg = oBundle.getText("helloMsg", [sRecipient]);

		// show message
		MessageToast.show(sMsg);
	}
}
