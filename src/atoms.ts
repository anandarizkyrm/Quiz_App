import { atomWithStorage, RESET } from 'jotai/utils'
// import { formPayload } from './pages/Login'
import {atom } from "jotai"


export const userDataFromLocalStorage : any = atomWithStorage('userData', null)


export const isQuizOngoing  = atom(false)
export const isQuizStart = atom(false)