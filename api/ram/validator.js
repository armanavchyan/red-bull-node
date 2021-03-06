/* eslint-disable eqeqeq */
/* eslint-disable quotes */
import { getOneService } from "./service.js";

export async function isExists(val) {
  const geted = await getOneService(val);

  if (!geted) {
    return Promise.reject();
  }

  return true;
}

export function isDdrNum(val) {
  if (!(val === "ddr3" || val === "ddr4" || val === "ddr5")) {
    return Promise.reject();
  }
  return true;
}
