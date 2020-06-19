import { Dispatch } from 'redux'
import api from '../service'
import { DATA_LIST, TABCURRENT, ANTHOLOGY, PLAYURL, RESET_DATA, SHOWACTIVITY, PAGE, STOPA } from './constants'

export const actions = {
    resetData() {
        return {
            type: RESET_DATA,
        }
    },
    getDataList() {
        return (dispatch: Dispatch, getState: any) => {
            const { counter } = getState()
            const { tabCurrent, page, num, data: prvData } = counter
            const apiObj = {
                0: api.getHotList,
                1: api.getMovie,
                2: api.getTvPaly,
                3: api.getAnime,
                4: api.getAnime,
            }
            const typeObj = {
                0: '推荐',
                1: '电影',
                2: '电视剧',
                3: '动漫',
                4: '综艺',
            }
            apiObj[tabCurrent]({ type: typeObj[tabCurrent], page, num }).then((res: any) => {
                const { data } = res

                if (data.length > 1 && data.length < 21) {
                    dispatch({
                        type: STOPA,
                        payload: true,
                    })
                }

                let result = Array.from(new Set(prvData.concat(data)))
                dispatch({
                    type: DATA_LIST,
                    payload: result,
                })
                dispatch({
                    type: SHOWACTIVITY,
                    payload: true,
                })
            })
        }
    },
    setPage(pages?: number) {
        return (dispatch: Dispatch, getState: any) => {
            const { counter } = getState()
            const { page } = counter
            dispatch({
                type: PAGE,
                payload: pages === 0 ? 0 : page + 1,
            })
        }
    },
    setStopA(value: boolean) {
        return {
            type: STOPA,
            payload: value,
        }
    },
    setShowActivity(value: boolean) {
        return {
            type: SHOWACTIVITY,
            payload: value,
        }
    },
    setTabCurrent(tabCurrent: number) {
        return {
            type: TABCURRENT,
            payload: tabCurrent,
        }
    },
    setAnthology(key: number) {
        return {
            type: ANTHOLOGY,
            payload: key,
        }
    },
    setPlayUrl(url: string) {
        return {
            type: PLAYURL,
            payload: url,
        }
    },
}
