import { AnyAction } from 'redux'

import { DATA_LIST, TABCURRENT, PLAYURL, ANTHOLOGY, RESET_DATA, SHOWACTIVITY, PAGE, STOPA } from './constants'

interface IStore {
    data: any[]
    tabCurrent: number
    page: number
    num: number
    playUrl: string
    anthology: number | null
    showActivity: boolean
    isStop: boolean
}

const INITIAL_STATE: IStore = {
    data: [],
    tabCurrent: 0,
    page: 0,
    num: 21,
    playUrl: '',
    anthology: null,
    showActivity: true,
    isStop: false,
}

export default {
    counter(state = INITIAL_STATE, action: AnyAction) {
        const { type, payload } = action
        switch (type) {
            case RESET_DATA: {
                return {
                    ...state,
                    anthology: null,
                    playUrl: '',
                    data: [],
                }
            }
            case SHOWACTIVITY: {
                return {
                    ...state,
                    showActivity: payload,
                }
            }

            case DATA_LIST: {
                return {
                    ...state,
                    data: payload,
                }
            }

            case TABCURRENT: {
                return {
                    ...state,
                    tabCurrent: payload,
                }
            }

            case ANTHOLOGY: {
                return {
                    ...state,
                    anthology: payload,
                }
            }

            case PLAYURL: {
                return {
                    ...state,
                    playUrl: payload,
                }
            }

            case PAGE: {
                return {
                    ...state,
                    page: payload,
                }
            }

            case STOPA: {
                return {
                    ...state,
                    isStop: payload,
                }
            }

            default:
                return state
        }
    },
}
