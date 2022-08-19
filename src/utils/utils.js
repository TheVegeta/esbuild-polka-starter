import stringify from "fast-json-stable-stringify";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs-extra";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import path from "path";
import polka from "polka";

export const onError = (err, req, res, next) => {
  console.log(err);
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

export const readFile = async (fileName) => {
  const dataBuffer = await fs.promises.readFile(
    path.resolve(__dirname, `uploads/${fileName}`)
  );

  const file = await fileTypeFromBuffer(dataBuffer);

  return { stream: dataBuffer, type: file.mime };
};

export const randomId = (n) => nanoid(n);

export const Router = () => polka({ onError });
