import express from "express";
import { urlModel } from "../models/shortUrl";

// Create URL
export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const existingUrl = await urlModel.find({ fullUrl });
    // console.log("The fullUrl", req.body.fullUrl);
    if (existingUrl.length > 0) {
      return res.status(409).json({
        message: "URL already exists",
      });
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      return res.status(201).json({
        message: "URL created successfully",
        shortUrl,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

// Get all URLs
export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: -1 });
    if (shortUrls.length < 0) {
      return res.status(404).send({ message: "Short Urls not found" });
    } else {
      return res.status(200).send(shortUrls);
    }
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

// Get a single URL using the shortUrl generated
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.shortUrl });
    if (!shortUrl) {
      return res.status(404).json({ message: "Full Url not found" });
    } else {
      shortUrl.clicks++;
      await shortUrl.save();
      // res.status(200).send(shortUrl);
      return res.status(302).redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete URL
export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      return res.status(200).json({ message: "URL successfully deleted" });
    }
    if (!shortUrl) {
      return res.status(404).send({
        message: "URL not found",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
