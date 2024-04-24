import {body} from "express-validator";

export const addProductValidation=[
    body("name","Product name is required").not().isEmpty(),
];