import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MatchingServicesDocument = HydratedDocument<MatchingService>;

@Schema()
export class MatchingService {
  @Prop({ required: true })
  matching_service_id: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  difficulty: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  expired_at: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop()
  modified_at: Date;
}

export const MatchingServicesSchema = SchemaFactory.createForClass(MatchingService);
