import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MatchingServicesDocument = HydratedDocument<MatchingService>;

@Schema()
export class MatchingService {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  difficulty: string;

  @Prop({ required: true })
  category: string;

  @Prop({
    required: true,
    default: () => new Date(Date.now() + 8 * 60 * 60 * 1000 + 30000),
  })
  expired_at: Date;

  @Prop({ required: true, default: "active" })
  status: string;

  @Prop({
    required: true,
    default: () => new Date(Date.now() + 8 * 60 * 60 * 1000),
  })
  created_at: Date;

  @Prop()
  modified_at: Date;
}

export const MatchingServicesSchema =
  SchemaFactory.createForClass(MatchingService);
