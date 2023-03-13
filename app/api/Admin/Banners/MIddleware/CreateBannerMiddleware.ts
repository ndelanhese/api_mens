import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const createBannerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    title: joi.string().required(),
    area: joi.string().required(),
    url: joi.string().allow(''),
    start_date: joi.date().allow(''),
    end_date: joi.date().allow(''),
    status: joi.string().allow(''),
  });
  const createMediaSchema = joi.object({
    desktop_image: joi.required(),
    mobile_image: joi.required(),
  });
  const { error: errorBody } = createSchema.validate(req.body, { messages });
  const { error: errorFile } = createMediaSchema.validate(req.files, {
    messages,
  });
  if (errorBody || errorFile) {
    const message =
      errorBody?.details[0].message || errorFile?.details[0].message;
    return res.status(400).send({ message });
  }
  const desktopImage = req?.files?.desktop_image;
  const mobileImage = req?.files?.desktop_image;
  if (
    !desktopImage ||
    Array.isArray(desktopImage) ||
    !mobileImage ||
    Array.isArray(mobileImage)
  ) {
    return res
      .status(400)
      .send({ message: 'Por favor, envie um arquivo para ser importado' });
  }
  const getExtensionRegex = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i;
  const matchDesktopImage = desktopImage.name.match(getExtensionRegex);
  const matchMobileImage = mobileImage.name.match(getExtensionRegex);

  if (!matchDesktopImage || !matchMobileImage) {
    return res
      .status(400)
      .send({ message: 'Por favor, envie um arquivo .jpg ou .png' });
  }

  next();
};

export default createBannerMiddleware;
