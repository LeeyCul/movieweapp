import Taro, { useRouter, useEffect, useState, useDidShow } from '@tarojs/taro'
import { View, Video, Button, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import './style.scss'

import api from '../../service'
import { actions } from '../../store/actions'
import PlayList from '../details/component/playList'

interface Rate {
    name: string
    rate: number
}

function Paly() {
    const dispatch = useDispatch()
    const { playUrl, anthology } = useSelector((state: any) => state.counter)

    const [data, setData] = useState<any>('[]')
    const [rate, setRate] = useState<number>(0)
    const [isShowMore, setIsShowMore] = useState<boolean>(false)
    const [status, setStatus] = useState<any>({})
    const rateArr: Rate[] = [
        { name: '倍速1.0', rate: 1 },
        { name: '倍速1.25', rate: 1.25 },
        { name: '倍速1.5', rate: 1.5 },
        { name: '倍速2.0', rate: 2 }
    ]
    const videoContext = Taro.createVideoContext('myVideo')

    function getData(id) {
        api.getDetails({ id }).then((res: any) => {
            const { data } = res
            const allData = data[0]
            const urlList = allData && JSON.parse(allData.video_url)
            urlList.length > 1 && setIsShowMore(true)
            setData(allData)
        })
    }

    function getStatus() {
        api.getShouStatus({}).then((res: any) => {
            setStatus(res)
        })
    }

    useEffect(() => {
        getStatus()
        const { referrerInfo } = Taro.getLaunchOptionsSync()
        const { extraData } = referrerInfo
        dispatch(actions.setAnthology(extraData.key))
        dispatch(actions.setPlayUrl(extraData.url))
        getData(extraData.id)
    }, [])

    function handleRateClick(rate, key) {
        videoContext.playbackRate(rate)
        setRate(key)
    }
    data &&
        Taro.setNavigationBarTitle({
            title: data.title || '...'
        })

    Taro.showShareMenu({
        withShareTicket: true
    })

    return (
        <View className="play_conainer">
            {status && status.play_show && (
                <View>
                    <Video
                        id="myVideo"
                        src={playUrl}
                        controls={true}
                        autoplay={true}
                        // initialTime="0"
                        loop={false}
                        muted={false}
                    />
                    <View className="rate_conainer">
                        {rateArr.map((item, key) => {
                            return (
                                <View className="rate_box" key={item.name} onClick={() => handleRateClick(item.rate, key)}>
                                    <AtIcon data-rate={1} value="lightning-bolt" size="18" color={rate === key ? '#f00' : '#49b849'} />
                                    <View className="text">{item.name}</View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            )}
            {status && !status.play_show && (
                <View className="plot_box">
                    <Text className="title">剧情介绍</Text>
                    <View className="content">
                        <Text>{data && data.profile}</Text>
                    </View>
                </View>
            )}
            <View className="btn_box">
                <Button
                    className="btn search"
                    onClick={() =>
                        Taro.navigateBackMiniProgram({
                            extraData: {
                                key: anthology
                            },
                            success: function(res) {}
                        })
                    }
                >
                    返回播放列表
                    <AtIcon value="search" size="14" color="#FFF"></AtIcon>
                </Button>
                <Button open-type="share" className="btn share">
                    分享给好友
                    <AtIcon value="share" size="14" color="#FFF"></AtIcon>
                </Button>
            </View>
            {status && status.play_show && isShowMore && <PlayList title="选集" data={data && data.video_url} />}
        </View>
    )
}
export default Paly
