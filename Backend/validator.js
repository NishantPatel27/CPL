const Joi = require("joi");

exports.userSignupSchemaValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password should have at least {#limit} characters",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Password confirmation is required",
  }),
  status: Joi.string().valid("active", "inactive").default("active").messages({
    "string.base": "Status should be a string",
    "any.only": "Status should be either 'active' or 'inactive'",
  }),
  role: Joi.string().valid("team", "admin").default("team").messages({
    "string.base": "Role should be a string",
    "any.only": "Role should be either 'team' or 'admin'",
  }),
});

exports.userLoginSchemaValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password should have at least {#limit} characters",
    "any.required": "Password is required",
  }),
});

exports.teamSchemaValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Team name should be a string",
    "any.required": "Team name is required",
  }),
  logo: Joi.string().meta({ type: "file" }).required(),
  bidPointBalance: Joi.number().required().min(0).messages({
    "number.base": "Bid point balance should be a number",
    "number.min": "Bid point balance should be at least {#limit}",
  }),
  mentor: Joi.string().required().messages({
    "string.base": "Mentor should be a string",
  }),
  captain: Joi.string().required().messages({
    "string.base": "Captain should be a string",
  }),
  viceCaptain: Joi.string().required().messages({
    "string.base": "Vice-Captain should be a string",
  }),
  totalPlayer: Joi.number().required().min(0).messages({
    "number.base": "Total players should be a number",
    "number.min": "Total players should be at least {#limit}",
  }),
});

exports.playerSchemaValidation = Joi.object({
  image: Joi.string().required().messages({
    "any.required": "Image is required",
  }),
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "any.required": "Name is required",
  }),
  currentSemester: Joi.string().required().messages({
    "string.base": "Current semester should be a string",
    "any.required": "Current semester is required",
  }),
  dateOfBirth: Joi.date().iso().required().messages({
    "date.base": "Date of birth should be a valid date",
    "date.isoDate": "Date of birth should be in ISO date format",
    "any.required": "Date of birth is required",
  }),
  phoneNumber: Joi.number().required().messages({
    "number.base": "Phone number should be a number",
    "any.required": "Phone number is required",
  }),
  branch: Joi.string().required().messages({
    "string.base": "Branch should be a string",
    "any.required": "Branch is required",
  }),
  basePrice: Joi.number().min(0).messages({
    "number.base": "Base price should be a number",
    "number.min": "Base price should be at least {#limit}",
  }),
  bidPrice: Joi.number().min(0).messages({
    "number.base": "Bid price should be a number",
    "number.min": "Bid price should be at least {#limit}",
  }),
  previousTeam: Joi.string().required().messages({
    "string.base": "Previous team should be a string",
    "any.required": "Previous team is required",
  }),
  currentTeam: Joi.string().required().messages({
    "string.base": "Current team should be a string",
    "any.required": "Current team is required",
  }),
  playerType: Joi.string().required().messages({
    "string.base": "Player type should be a string",
    "any.required": "Player type is required",
  }),
  battingHand: Joi.string().messages({
    "string.base": "Batting hand should be a string",
  }),
  fours: Joi.number().min(0).messages({
    "number.base": "Fours should be a number",
    "number.min": "Fours should be at least {#limit}",
  }),
  sixes: Joi.number().min(0).messages({
    "number.base": "Sixes should be a number",
    "number.min": "Sixes should be at least {#limit}",
  }),
  bowlingStyle: Joi.string().messages({
    "string.base": "Bowling style should be a string",
  }),
  HighestWicket: Joi.number().min(0).messages({
    "number.base": "Highest wicket should be a number",
    "number.min": "Highest wicket should be at least {#limit}",
  }),
  overs: Joi.number().min(0).messages({
    "number.base": "Overs should be a number",
    "number.min": "Overs should be at least {#limit}",
  }),
  innings: Joi.number().min(0).messages({
    "number.base": "Innings should be a number",
    "number.min": "Innings should be at least {#limit}",
  }),
  totalRuns: Joi.number().min(0).messages({
    "number.base": "Total runs should be a number",
    "number.min": "Total runs should be at least {#limit}",
  }),
  totalWickets: Joi.number().min(0).messages({
    "number.base": "Total wickets should be a number",
    "number.min": "Total wickets should be at least {#limit}",
  }),
  average: Joi.number().min(0).messages({
    "number.base": "Average should be a number",
    "number.min": "Average should be at least {#limit}",
  }),
  strikeRate: Joi.number().min(0).messages({
    "number.base": "Strike rate should be a number",
    "number.min": "Strike rate should be at least {#limit}",
  }),
  economyRate: Joi.number().min(0).messages({
    "number.base": "Economy rate should be a number",
    "number.min": "Economy rate should be at least {#limit}",
  }),
});

// module.exports = { userSignupSchemaValidation, userLoginSchemaValidation, teamSchemaValidation, playerSchemaValidation };
