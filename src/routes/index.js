import express from 'express';
import {
  indexPage, messagesPage, userPage, addMessage, LessonsPage, authenticate, me, LevelsPage,
  ChallengeDetails, ChallengeQuestions, Challenges, UpdateStudentAnswers, UpdateStudentLevels,
  UpdateStudentChallenges, ChallengeQuestionsC01
} from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/users', userPage);
indexRouter.get('/userLessons', LessonsPage);
indexRouter.get('/userLevels', LevelsPage);
indexRouter.get('/ChallengeDetails', ChallengeDetails);
indexRouter.get('/ChallengeQuestionsC01', ChallengeQuestionsC01);
indexRouter.get('/Challenges', Challenges);
indexRouter.get('/ChallengeQuestions', ChallengeQuestions);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);
indexRouter.post('/login', authenticate);
indexRouter.get('/me', me);
indexRouter.post('/UpdateStudentAnswers', UpdateStudentAnswers);
indexRouter.post('/UpdateStudentLevels', UpdateStudentLevels);
indexRouter.post('/UpdateStudentChallenges', UpdateStudentChallenges);

export default indexRouter;
