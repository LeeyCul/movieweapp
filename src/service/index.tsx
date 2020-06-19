import http from '../utils/http'
const baseUrl1 = 'https://movie.redatao.com/program/api'
const baseUrl2 = 'https://v.baidu.com'
const baseUrl3 = 'https://mov.cullee.com'

const getHotList = param => http(`${baseUrl1}/m/type-hot`, param, 'POST', true)
const getMovie = param => http(`${baseUrl1}/m/type-m`, param, 'POST', true)
const getTvPaly = param => http(`${baseUrl1}/m/type-s`, param, 'POST', true)
const getAnime = param => http(`${baseUrl1}/m/type`, param, 'POST', true)
const getDetails = param => http(`${baseUrl1}/mv/detail`, param, 'POST', true)
const getCondition = param => http(`${baseUrl1}/m/search-data`, param, 'GET', true)
const getSearch = param => http(`${baseUrl1}/m/search`, param, 'POST', true)
const getRankTab = param => http(`${baseUrl1}/mv/tab`, param, 'GET', true)
const getRankList = param => http(`${baseUrl2}/videoapi`, param, 'GET', true)
const getByName = param => http(`${baseUrl1}/mv/searchByName`, param, 'POST', true)
const getShouStatus = param => http(`${baseUrl3}/api/play`, param, 'GET', true)

export default {
    getHotList,
    getMovie,
    getTvPaly,
    getAnime,
    getDetails,
    getCondition,
    getSearch,
    getRankTab,
    getRankList,
    getByName,
    getShouStatus
}
