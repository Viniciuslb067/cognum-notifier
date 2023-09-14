import express, { Request, RequestHandler, Response } from "express";

import { errorResponseHandler, successResponseHandler } from "../util";

import NotificationService from "../services/notification-service";

const router = express.Router();

const notificationService = new NotificationService();

router.post("/send-notification", (async (
  request: Request,
  response: Response
) => {
  try {
    const employees = await notificationService.sendNotification({
      ...request.body,
    });

    successResponseHandler({ response, extraInfo: { employees } });
  } catch (error: any) {
    errorResponseHandler({
      response,
      message: error.name,
      statusCode: error.statusCode,
    });
  }
}) as RequestHandler);

export default router;
