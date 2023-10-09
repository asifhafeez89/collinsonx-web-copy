import Joi from 'joi';

const schema = Joi.object({
  externalId: Joi.number().optional().allow(''),
  membershipNumber: Joi.number().optional().allow(''),
  email: Joi.string()
    .optional()
    .email({ tlds: { allow: false } })
    .allow('')
    .message('Invalid email'),
  customFirstName: Joi.string().optional().allow(''),
  customLastName: Joi.string().optional().allow(''),
});

export type SchemaType = {
  externalId: number;
  membershipNumber: number;
  email: string;
  customFirstName: string;
  customLastName: string;
};

export default schema;
