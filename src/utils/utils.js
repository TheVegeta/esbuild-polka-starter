import stringify from "fast-json-stable-stringify";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import polka from "polka";

export const onError = (err, req, res, next) => {
  res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  res.setHeader("content-type", "application/json").end(
    stringify({
      success: false,
      msg: "Something went wrong on the server.",
      data: {},
    })
  );
};

export const supportJson = (req, res, next) => {
  res.json = (data) => {
    res.setHeader("content-type", "application/json");
    res.end(stringify(data));
  };
  next();
};

export const randomId = (n) => nanoid(n);

export const Router = () => polka({ onError });
