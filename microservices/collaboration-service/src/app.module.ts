import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { YjsModule } from "./yjs/yjs.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), YjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
