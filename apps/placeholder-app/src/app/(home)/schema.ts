import Joi from 'joi';

const schema = Joi.object({
  consumerNumber: Joi.string()
    .min(2)
    .message('Consumer number should have at least 2 letters'),
  membershipNumber: Joi.string()
    .min(2)
    .message('Membership number should have at least 2 letters'),
  email: Joi.string()
    .optional()
    .email({ tlds: { allow: false } })
    .allow('')
    .message('Invalid email'),
  firstName: Joi.string().optional().allow(''),
  lastName: Joi.string().optional().allow(''),
});

export type SchemaType = {
  consumerNumber: string;
  membershipNumber: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default schema;
