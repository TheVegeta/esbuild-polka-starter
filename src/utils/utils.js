import stringify from "fast-json-stable-stringify";
import polka from "polka";

export const onError = (err, req, res, next) => {
  res.statusCode = 500;
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

export const Router = () => polka({ onError });
