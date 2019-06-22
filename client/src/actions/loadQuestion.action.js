import { QUESTION } from "../constants";

export const loadQuesStart = () => ({
  type: QUESTION.START
});

export const successQues = payload => ({
  type: QUESTION.SUCCESS,
  payload
});

export const failQues = err => ({
  type: QUESTION.FAIL,
  payload: err
});
