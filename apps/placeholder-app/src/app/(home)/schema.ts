import Joi from 'joi';

const schema = Joi.object({
  sourceCode: Joi.string().optional().allow('').max(15),
  membershipNumber: Joi.string().optional().allow(''),
  email: Joi.string()
    .optional()
    .email({ tlds: { allow: false } })
    .allow('')
    .message('Invalid email'),
  customFirstName: Joi.string().optional().allow(''),
  customLastName: Joi.string().optional().allow(''),
});

export type SchemaType = {
  sourceCode: string;
  membershipNumber: string;
  email: string;
  customFirstName: string;
  customLastName: string;
};

export default schema;
