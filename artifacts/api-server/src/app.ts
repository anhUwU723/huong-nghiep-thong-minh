import express, { Request, Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

// Sửa lại khai báo app đơn giản, chuẩn xác
const app = express();

app.use(
  pinoHttp({
    logger: logger,
    serializers: {
      req(req: any) { // Chuyển thành any tạm thời để Vercel không bắt bẻ req.id
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) { // Chuyển thành any để tránh lỗi ép kiểu Response của Express
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
