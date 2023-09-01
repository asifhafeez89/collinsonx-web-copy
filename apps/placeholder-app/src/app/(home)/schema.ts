import Joi from 'joi';

const schema = Joi.object({
  sourceCode: Joi.string()
    .optional()
    .max(15)
    .message('SourceCode is a varchar(15)'),
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
  sourceCode: string;
  membershipNumber: string;
  email: string;
};

export default schema;
