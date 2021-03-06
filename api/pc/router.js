/* eslint-disable import/named */
import express from "express";

import { body, param } from "express-validator";
import { checkRole, expressValidationResult } from "../../utils/middlewares.js";
import * as validator from "./validator.js";
import * as controller from "./controller.js";
import * as errorMessages from "../../constants/errorMessages.js";
import * as fileValidator from "../file/validator.js";
import * as mouseValidator from "../mouse/validator.js";
import * as keyboardValidator from "../keyboard/validator.js";
import * as displayValidator from "../display/validator.js";
import * as ramValidator from "../ram/validator.js";
import * as processorValidator from "../processor/validator.js";

const router = express.Router();

router.get("/", checkRole("USER", "GET"), controller.getAll);

router.get(
  "/:id",
  checkRole("USER", "GET"),
  param("id", errorMessages.notFound).custom(validator.isExists),
  controller.getOne,
);

router.post(
  "/",
  checkRole("USER", "POST"),
  body("procName", errorMessages.stringErrMessage(2, 255))
    .isLength({ min: 2, max: 255 }),
  body("price", errorMessages.integerErrMessage(0, 10000000))
    .isInt({ min: 0, max: 10000000 }),
  body("img", errorMessages.notFound).custom(fileValidator.isExists),
  body("mouse", errorMessages.notFound).custom(mouseValidator.isExists),
  body("keyboard", errorMessages.notFound).custom(keyboardValidator.isExists),
  body("display", errorMessages.notFound).custom(displayValidator.isExists),
  body("ram", errorMessages.notFound).custom(ramValidator.isExists),
  body("processor", errorMessages.notFound).custom(processorValidator.isExists),
  body("count", errorMessages.integerErrMessage(1, 100))
    .isInt({ min: 1, max: 100 }),
  expressValidationResult,
  controller.create,
);

router.patch(
  "/:id",
  checkRole("USER", "PATCH"),
  param("id", errorMessages.notFound).custom(validator.isExists),
  body("procName", errorMessages.stringErrMessage(2, 255)).optional()
    .isLength({ min: 2, max: 255 }),
  body("price", errorMessages.integerErrMessage(0, 10000000))
    .optional().isInt({ min: 0, max: 10000000 }),
  body("img", errorMessages.notFound).optional().custom(fileValidator.isExists),
  body("mouse", errorMessages.notFound).optional().custom(mouseValidator.isExists),
  body("keyboard", errorMessages.notFound).optional().custom(keyboardValidator.isExists),
  body("display", errorMessages.notFound).optional().custom(displayValidator.isExists),
  body("ram", errorMessages.notFound).optional().custom(ramValidator.isExists),
  body("processor", errorMessages.notFound).optional().custom(processorValidator.isExists),
  body("count", errorMessages.integerErrMessage(1, 100)).optional().isInt({ min: 1, max: 100 }),
  body("_id", errorMessages.notAccessible).optional().custom(() => Promise.reject()),
  expressValidationResult,
  controller.update,
);

router.delete(
  "/:id",
  checkRole("USER", "DELETE"),
  param("id", errorMessages.notFound).custom(validator.isExists),
  expressValidationResult,
  controller.remove,
);
export default router;
