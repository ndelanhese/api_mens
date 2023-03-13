import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateBannerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    title: joi.string().allow(''),
    area: joi.string().allow(''),
    url: joi.string().allow(''),
    start_date: joi.date().allow(''),
    end_date: joi.date().allow(''),
    status: joi.string().allow(''),
    desktop_image: joi.allow(''),
    mobile_image: joi.allow(''),
  });

  const verifySchema = joi.object({
    id: joi.number().required(),
  });

  const { error: errorBody } = updateSchema.validate(req.body, { messages });
  const { error: errorParams } = verifySchema.validate(req.params, {
    messages,
  });

  if (errorBody || errorParams) {
    const message =
      errorBody?.details[0].message || errorParams?.details[0].message;
    return res.status(400).send({ message });
  }
  const desktopImage = req?.files?.desktop_image;
  const mobileImage = req?.files?.mobile_image;
  if (Array.isArray(desktopImage) || Array.isArray(mobileImage)) {
    return res.status(400).send({
      message: 'Por favor, envie um arquivo valido para ser importado',
    });
  }
  if (!desktopImage && !mobileImage) return next();
  const getExtensionRegex = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i;
  const matchDesktopImage = desktopImage
    ? desktopImage.name.match(getExtensionRegex)
    : true;
  const matchMobileImage = mobileImage
    ? mobileImage.name.match(getExtensionRegex)
    : true;
  if (!matchDesktopImage || !matchMobileImage) {
    return res
      .status(400)
      .send({ message: 'Por favor, envie um arquivo .jpg ou .png' });
  }

  next();
};
export default updateBannerMiddleware;
