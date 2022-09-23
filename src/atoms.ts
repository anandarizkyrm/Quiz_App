import { atomWithStorage } from 'jotai/utils'
import {atom } from "jotai"


export const userDataFromLocalStorage : any = atomWithStorage('userData', null)

export const isQuizOngoing  = atom(false)

export const isQuizStart = atom(false)