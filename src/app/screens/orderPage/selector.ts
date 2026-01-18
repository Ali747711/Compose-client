import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectOrderPage = (state: AppRootState) => state.orderPage;

export const retrievePauseOrders = createSelector(
  selectOrderPage,
  (OrderPage) => OrderPage.pauseOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrderPage,
  (OrderPage) => OrderPage.processOrders
);

export const retrieveFinishOrders = createSelector(
  selectOrderPage,
  (OrderPage) => OrderPage.finishOrders
);
