import { atomWithStorage, RESET } from 'jotai/utils'
// import { formPayload } from './pages/Login'
import {atom } from "jotai"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userDataFromLocalStorage : any = atomWithStorage('userData', null)

export const isQuizFinish = atom(false) 

// export const [getUserDataFromLocalStorage, setUser] = useAtom(userDataFromLocalStorage);