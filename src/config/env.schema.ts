import 'dotenv/config';
import * as joi from 'joi';

interface EnvInterface {
    PORT: number;
    LIMIT: number;
    NODE_ENV: string;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    DATABASE_URL: string;
    TOKEN_JWT: string;
    MP_ACCESS_TOKEN: string;
    MP_PUBLIC_KEY: string;
    BACK_URL_SUCCESS: string;
    BACK_URL_PENDING: string;
    BACK_URL_FAILURE: string;
    MP_WEBHOOK_URL: string;
    MINUTES_TO_CANCEL_ORDER: number;
    MY_URL_FRONTEND: string;
}

const varsSchema = joi.object<EnvInterface>({
    PORT: joi.number().required(),
    LIMIT: joi.number().required(),
    NODE_ENV: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    TOKEN_JWT: joi.string().required(),
    MP_ACCESS_TOKEN: joi.string().required(),
    MP_PUBLIC_KEY: joi.string().required(),
    BACK_URL_SUCCESS: joi.string().required(),
    BACK_URL_PENDING: joi.string().required(),
    BACK_URL_FAILURE: joi.string().required(),
    MP_WEBHOOK_URL: joi.string().required(),
    MINUTES_TO_CANCEL_ORDER: joi.number().required(),
    MY_URL_FRONTEND: joi.string().required(),
}).unknown(true);

const { error, value } = varsSchema.validate(process.env);

if (error) {
    throw new Error('Invalid environment variables');
}

export const envs = {
    port: value.PORT,
    limit: value.LIMIT,
    node_env: value.NODE_ENV,
    postgres_db: value.POSTGRES_DB,
    postgres_user: value.POSTGRES_USER,
    postgres_password: value.POSTGRES_PASSWORD,
    database_url: value.DATABASE_URL,
    token_jwt: value.TOKEN_JWT,
    mp_access_token: value.MP_ACCESS_TOKEN,
    mp_public_key: value.MP_PUBLIC_KEY,
    back_url_success: value.BACK_URL_SUCCESS,
    back_url_pending: value.BACK_URL_PENDING,
    back_url_failure: value.BACK_URL_FAILURE,
    mp_webhook_url: value.MP_WEBHOOK_URL,
    minutes_to_cancel_order: value.MINUTES_TO_CANCEL_ORDER,
    my_url_frontend: value.MY_URL_FRONTEND,
} as const;