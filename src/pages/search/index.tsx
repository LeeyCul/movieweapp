import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import ListView from 'taro-listView'

import './style.scss'

import api from '../../service'
import ConditionView from './component/conditionView'
import SearchPut from '../../components/searchPut'
import MovieList from '../../components/movieList'

interface Condition {
    country: string[]
    type: string[]
    year: string[]
}

function Search() {
    const [condition, setCondition] = useState<Condition>()
    const [dataList, setDatalist] = useState([])
    let len = dataList.length
    const [param, setParam] = useState({
        type: '不限',
        year: '不限',
        country: '不限',
        name: ''
    })
    async function getCondition() {
        const res: any = await api.getCondition({})
        setCondition(res)
    }

    async function searchResult(params) {
        const res: any = await api.getSearch(params)
        const { data } = res
        setDatalist(data)
    }
    useEffect(() => {
        getCondition()
        searchResult(param)
    }, [])

    function handleType(val) {
        setParam({ ...param, type: val })
        searchResult({ ...param, type: val })
    }

    function handleYear(val) {
        setParam({ ...param, year: val })
        searchResult({ ...param, year: val })
    }

    function handleCountry(val) {
        setParam({ ...param, country: val })
        searchResult({ ...param, country: val })
    }

    function handleSearch(value) {
        searchResult({ ...param, name: value })
    }

    Taro.showShareMenu({
        withShareTicket: true
    })
    return (
        <View className="search_conainer">
            <AtNoticebar marquee>点击右上角三个点，添加到“我的小程序”，不迷路</AtNoticebar>
            <SearchPut onClick={handleSearch} />
            <View className="box_view">
                <ConditionView getValue={handleType} title="类型" data={condition && condition.type} />
                <ConditionView getValue={handleYear} title="年份" data={condition && condition.year} />
                <ConditionView getValue={handleCountry} title="地区" data={condition && condition.country} />
            </View>
            <View style={{ height: '70%' }}>
                <ListView
                    isLoaded={true}
                    hasMore={false}
                    isEmpty={len > 0 ? false : true}
                    emptyText="没有搜索到匹配资源?试试别的关键字"
                    footerLoadingText="已经到底了"
                    autoHeight
                    distanceToRefresh={50}
                    lazyStorage="lazyViewBlock"
                >
                    <MovieList data={dataList} />
                </ListView>
            </View>
        </View>
    )
}

Search.config = {
    navigationBarTitleText: '影视搜索'
}

export default Search
