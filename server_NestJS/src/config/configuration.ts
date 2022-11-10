import * as Joi from "joi";

import { NODE_ENV } from "../constants/app.constants";

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  NODE_ENV: Joi.string().valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION).required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  // JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  // JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});
