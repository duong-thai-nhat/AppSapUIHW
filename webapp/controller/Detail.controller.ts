import BaseController from "./BaseController";
import History from "sap/ui/core/routing/History";

/**
 * @namespace myapp.controller
 */
export default class Detail extends BaseController {
    onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    }

    onObjectMatched(oEvent: any) {
        this.getView().bindElement({
            path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
            model: "invoice"
        });
    }
    onNavBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("overview", {}, true);
        }
    }
}
