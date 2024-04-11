import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalServicesService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) { }

  async fetchUserData(userId: string): Promise<any> {
    const userServiceUrl = this.configService.get('USER_SERVICE_URL');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${userServiceUrl}/users/${userId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch user data', HttpStatus.BAD_GATEWAY);
    }
  }

  async fetchQuestionData(questionId: string): Promise<any> {
    const questionServiceUrl = this.configService.get('QUESTION_SERVICE_URL');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${questionServiceUrl}/questions/${questionId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch question data', HttpStatus.BAD_GATEWAY);
    }
  }

  async fetchQuestionByCriteria(category: string, difficulty: string): Promise<any> {
    const questionServiceUrl = this.configService.get('QUESTION_SERVICE_URL');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${questionServiceUrl}/questions/find`, {
          params: { category, difficulty },
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch question by criteria', HttpStatus.BAD_GATEWAY);
    }
  }
}
