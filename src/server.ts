import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0", // Para evitar futuros problemas com o front end
    port: env.PORT || 3333,
  })
  .then(() => {
    console.log(`HTTP Server Running! PORT ${env.PORT}`);
  });
