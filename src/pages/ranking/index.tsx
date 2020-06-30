import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import './index.scss'

import api from '../../service'
import ListView from './component/listView'

function Ranking() {
    const [current, setCurrent] = useState<number>(0)
    const [rankTab, setRankTab] = useState([])
    const [rankList, setRankList] = useState([])

    const getTitle = () => {
        api.getRankTab({}).then((res: any) => {
            const { tab } = res
            const result =
                tab &&
                tab.length &&
                tab.map(item => {
                    return { title: item }
                })
            setRankTab(result)
        })
    }

    const getRankList = () => {
        api.getRankList({
            format: 'json',
            page_name: 'index',
            block_sign: 'list_index_top_movie_all,index_top_tv_all,index_top_tamasha,index_top_cartoon'
        }).then((res: any) => {
            const result =
                res &&
                res.map(item => {
                    const { data } = item
                    const { videos } = data
                    return { data: videos }
                })
            setRankList(result)
        })
    }

    useEffect(() => {
        getTitle()
        getRankList()
    }, [])

    function tabToggle(value: number) {
        setCurrent(value)
    }

    Taro.showShareMenu({
        withShareTicket: true
    })
    return (
        <View className="rank_conainer">
            <AtTabs current={current} tabList={rankTab} onClick={tabToggle}>
                {rankList.length &&
                    rankList.map((item: any, index) => {
                        const { data } = item
                        return (
                            <AtTabsPane current={current} index={index} key={index + '2'}>
                                <ListView data={data} />
                            </AtTabsPane>
                        )
                    })}
            </AtTabs>
        </View>
    )
}

Ranking.config = {
    navigationBarTitleText: '影视排行'
}

export default Ranking
