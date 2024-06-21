import { createParamDecorator } from '@nestjs/common';

export const GetData = createParamDecorator((data, req) => {
  return req.args[0].headers.authorization.split(' ')[1];
});
