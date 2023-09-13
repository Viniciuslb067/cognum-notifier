import express, { Request, RequestHandler, Response } from "express";

import { errorResponseHandler, successResponseHandler } from "../util";

const router = express.Router();

router.get("/hello", (_, response: Response) => {
  successResponseHandler({
    response,
    message: "Hello, Cognum!",
  });
});

router.get("/populate", (async (_, response: Response) => {
  try {
    successResponseHandler({ response });
  } catch (error: any) {
    errorResponseHandler({ response, message: error.message });
  }
}) as RequestHandler);

export default router;
