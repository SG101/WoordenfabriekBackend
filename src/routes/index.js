import express from 'express';
import {
  indexPage, messagesPage, userPage, addMessage, LessonsPage, authenticate, me
} from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/users', userPage);
indexRouter.get('/userLessons', LessonsPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);
indexRouter.post('/login', authenticate);
indexRouter.get('/me', me);

export default indexRouter;
