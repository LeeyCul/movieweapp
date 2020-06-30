import http from '../utils/http'
const baseUrl1 = 'https://movie.redatao.com/program/api'
const baseUrl2 = 'https://v.baidu.com'
const baseUrl3 = 'https://mov.cullee.com'

const getHotList = param => http(`${baseUrl1}/m/type-hot`, param, 'POST')
const getMovie = param => http(`${baseUrl1}/m/type-m`, param, 'POST')
const getTvPaly = param => http(`${baseUrl1}/m/type-s`, param, 'POST')
const getAnime = param => http(`${baseUrl1}/m/type`, param, 'POST')
const getDetails = param => http(`${baseUrl1}/mv/detail`, param, 'POST')
const getCondition = param => http(`${baseUrl1}/m/search-data`, param, 'GET')
const getSearch = param => http(`${baseUrl1}/m/search`, param, 'POST')
const getRankTab = param => http(`${baseUrl1}/mv/tab`, param, 'GET')
const getRankList = param => http(`${baseUrl2}/videoapi`, param, 'GET')
const getByName = param => http(`${baseUrl1}/mv/searchByName`, param, 'POST')
const getShouStatus = param => http(`${baseUrl3}/api/plays`, param, 'GET')

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
