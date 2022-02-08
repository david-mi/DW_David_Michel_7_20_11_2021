import { createContext } from 'react';
import { apiUsers, GetHeaders } from '../data/apiData';

const loginContext = createContext({});
const editingContext = createContext({});
const profilPictureUpdate = createContext({});
const globalContext = createContext({ apiUsers, GetHeaders });

export { loginContext, editingContext, profilPictureUpdate };

