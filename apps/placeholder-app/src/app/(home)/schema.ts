import Joi from 'joi';

const schema = Joi.object({
  membershipNumber: Joi.string()
    .min(2)
    .message('Membership number should have at least 2 letters'),
  email: Joi.string()
    .optional()
    .email({ tlds: { allow: false } })
    .allow('')
    .message('Invalid email'),
});

export type SchemaType = {
  membershipNumber: string;
  email: string;
};

export default schema;
