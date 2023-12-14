import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import SearchEvent from "sap/ui/base/Event";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";

/**
 * @namespace myapp.controller
 */
export default class InvoiceList extends BaseController {
    onInit() {
        const oViewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView().setModel(oViewModel, "view");
    }

    async statusText(sStatus: string) {
		const oResourceBundle = await this.getResourceBundle();
		switch (sStatus) {
			case "A":
				return oResourceBundle.getText("invoiceStatusA");
			case "B":
				return oResourceBundle.getText("invoiceStatusB");
			case "C":
				return oResourceBundle.getText("invoiceStatusC");
			default:
				return sStatus;
		}
	}

    onFilterInvoices(oEvent: SearchField$SearchEvent):void {
        // build filter array
        const aFilter: Filter[] = [];
        const sQuery: string = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }

        // filter binding
        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items") as JSONListBinding;
        oBinding.filter(aFilter);
    }

    onPress(oEvent: ListItemBase$PressEvent) {
        const oItem = oEvent.getSource();
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
            invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
        });
    }
}
