import { Document } from "mongoose";

export interface MatchingServices extends Document {
  readonly matching_service_id: number;
  email: string;
  readonly difficulty: string;
  readonly category: string;
  expired_at: Date;
  status: string;
  readonly created_at: Date;
  modified_at: Date;
}
