import express from "express";
import notificationRoutes from "./routes/notification-route";

const app = express();

app.use(express.json());

app.use(notificationRoutes);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
