import mongoose from "mongoose";
import { nanoid } from "nanoid";

const generateShortUrl = () => {
  const randomCharacters = nanoid(4); 
  return `${randomCharacters}.sci.app`;
};

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: generateShortUrl,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
