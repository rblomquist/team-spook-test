import HttpStatus from "http-status-codes";
export const serverErrorHandler = (err, req, res, next) => {
    console.log("working");
    if (err.extensions && err.extensions.code === "VALIDATION_FAILED") {
        return res.status(HttpStatus.BAD_REQUEST).send(err.message);
    }
    return next(err);
};