// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { queryByAttribute } from '@testing-library/react';
import LearnModeComponent from './components/learn-mode/LearnModeComponent';
import { SetupLanguageManager } from './languages/LanguageManager';
import { Jp } from './languages/jp';

export const getById = queryByAttribute.bind(null, 'id');
export const getByAlt = queryByAttribute.bind(null, 'alt');
