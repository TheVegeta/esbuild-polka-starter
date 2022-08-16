import jsonStringify from "fast-json-stable-stringify";
import polka from "polka";

export const handleJson = (req, res, next) => {
  res.json = (data) => {
    res.setHeader("content-type", "application/json");
    res.end(jsonStringify(data));
  };
  next();
};

export const handleErr = (req, res, err) => {
  res.statusCode = 500;
  res.setHeader("content-type", "application/json").end(
    jsonStringify({
      success: false,
      msg: "something went wrong on server",
      data: {},
    })
  );
};

export const Router = polka;
