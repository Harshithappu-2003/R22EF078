import mongoose from 'mongoose';
import shortid from 'shortid';

interface IClick {
  timestamp: Date;
  source: string | null;
  location: {
    country: string | null;
    city: string | null;
  }
}

interface IUrl {
  longUrl: string;
  shortCode: string;
  validity: number; // in minutes
  expiry: Date;
  clicks: IClick[];
}

const ClickSchema = new mongoose.Schema<IClick>({
  timestamp: { type: Date, default: Date.now },
  source: { type: String, default: null },
  location: {
    country: { type: String, default: null },
    city: { type: String, default: null },
  }
});

const UrlSchema = new mongoose.Schema<IUrl>({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    default: () => shortid.generate()
  },
  validity: {
    type: Number,
    default: 30
  },
  expiry: {
    type: Date,
    required: true,
  },
  clicks: [ClickSchema]
});

const Url = mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
