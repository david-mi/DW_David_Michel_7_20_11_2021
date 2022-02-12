import { createContext } from 'react';
import { apiUsers, getHeaders } from '../data/apiData';

const loginContext = createContext({});
const editingContext = createContext({});
const profilPictureUpdate = createContext({});
const globalContext = createContext({ apiUsers, getHeaders });
const refreshData = createContext({});

export { loginContext, editingContext, profilPictureUpdate, refreshData };

