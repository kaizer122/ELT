import crypto from "crypto";
import fs from "fs";
import jwt from "jsonwebtoken";
import mime from "mime-types";
import { promisify } from "util";

export const getUser = (
  authorization,
  secretKey = process.env.JWT_SECRET_KEY_ADMIN
) => {
  if (!authorization || !authorization.startsWith("Bearer "))
    return Promise.reject(auth.unAuthorized);
  const token = authorization.slice(7);
  return jwt.verify(token, secretKey, (err, user) => {
    if (err) return Promise.reject("Accès non autorisé");
    return Promise.resolve(user);
  });
};

export const createToken = (
  userModel,
  secretKey = process.env.JWT_SECRET_KEY_ADMIN,
  expiresIn = process.env.JWT_EXPIRES_IN_ADMIN
) => {
  const {
    _id,
    profile,
    email,
    mobile,
    emailVerified,
    mobileVerified,
    store,
    status,
    role,
    createdAt
  } = userModel;
  const user = {
    id: _id,
    profile,
    email,
    mobile,
    emailVerified,
    mobileVerified,
    store,
    status,
    role,
    createdAt
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      secretKey,
      {
        expiresIn,
        mutatePayload: true
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export const passwordGen = cb => {
  crypto.randomBytes(64, (err, buffer) => {
    if (err) cb(err);
    else {
      const password = buffer.toString("hex").substring(0, 10);
      cb(null, password);
    }
  });
};

const upload = (stream, filePath) => {
  return new Promise((resolve, reject) => {
    stream
      .on("error", () => {
        if (stream.truncated) fs.unlinkSync(filePath);
      })
      .pipe(fs.createWriteStream(filePath))
      .on("error", e => reject(e.message))
      .on("finish", () =>
        resolve(`${process.env.CUSTOMER_API_URL}/${filePath}`)
      );
  });
};

export const removeFile = (path, cb = null) => {
  fs.unlink(`.${path}`, () => {
    if (cb) cb();
  });
};

export const copyFile = (from, to, fileName) => {
  const extension = from
    .split(".")
    .pop()
    .trim();
  const newFilePath = `${UPLOADES_PATH}${to}/${fileName}.${extension}`;
  const copyFileAsync = promisify(fs.copyFile);
  return copyFileAsync(from, newFilePath).then(
    () => `${process.env.CUSTOMER_API_URL}/public${to}/${fileName}.${extension}`
  );
};

export const uploadFile = (
  file,
  subPath,
  id,
  oldPath = null,
  fileType = "image"
) => {
  return new Promise((resolve, reject) => {
    Promise.resolve(file)
      .then(({ createReadStream, mimetype }) => {
        const stream = createReadStream();
        const extension = mime.extension(mimetype);
        let filePath = PUBLIC_PATH;
        filePath += fileType === "image" ? "/images" : "/files";
        filePath += `/${subPath}/${id}.${extension}`;
        if (!mimetype.startsWith(fileType)) return reject(isNotAnImage);
        if (oldPath)
          removeFile(oldPath, () => {
            upload(stream, filePath)
              .then(link => resolve(link))
              .catch(e => reject(e));
          });
        else
          upload(stream, filePath)
            .then(link => resolve(link))
            .catch(e => reject(e));
      })
      .catch(e => reject(e.message));
  });
};
