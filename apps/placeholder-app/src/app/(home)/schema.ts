import Joi from 'joi';

const schema = Joi.object({
  sourceCode: Joi.string().optional().allow('').max(15),
  membershipNumber: Joi.string().optional().allow(''),
  email: Joi.string()
    .optional()
    .email({ tlds: { allow: false } })
    .allow('')
    .message('Invalid email'),
});

export type SchemaType = {
  sourceCode: string;
  membershipNumber: string;
  email: string;
};

export default schema;
