import 'dotenv/config';

export const up = (): void => {
  console.log('hello', process.env.ENV_VAR_TEST);
};

export const down = (): void => {

};

up();
