import Taro, { useEffect, useState, useRouter, usePullDownRefresh } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtNoticebar, AtIcon } from 'taro-ui'

import './style.scss'

import api from '../../service'
import Info from './component/info'
import PlayList from './component/playList'

function Details() {
    const router = useRouter()
    const { id } = router.params
    const [data, setData] = useState<any>()
    const [status, setStatus] = useState<any>({})

    async function getData() {
        const res: any = await api.getDetails({ id })
        const { data } = res
        data[0] &&
            Taro.setNavigationBarTitle({
                title: data[0].title
            })
        setData(data[0])
    }
    async function getStatus() {
        const res: any = await api.getShouStatus({})
        setStatus(res)
    }

    useEffect(() => {
        getData()
        getStatus()
    }, [])

    usePullDownRefresh(() => {
        getData()
        getStatus()
        Taro.stopPullDownRefresh()
    })

    function gotoPlay() {
        Taro.navigateTo({ url: `/pagesA/play/index?id=${data && data.id}` })
    }

    Taro.showShareMenu({
        withShareTicket: true
    })
    return (
        <View className="details_conainer">
            <AtNoticebar marquee>点击右上角三个点，添加到“我的小程序”，不迷路!内容均在底部，请滑到最下面观看！</AtNoticebar>
            <View className="base_info">
                {data ? (
                    <View className="info_box">
                        <View className="left">
                            <Image src={data.image} />
                        </View>
                        <View className="right">
                            <Info data={data && data} />
                        </View>
                    </View>
                ) : (
                    <View className="nodata">
                        <AtIcon value="heart-2" size="30" color="#ec7989"></AtIcon>
                        资源悄悄溜走了，点击“搜索更多影片”查看其他视频
                    </View>
                )}
            </View>
            <View className="plot_box">
                <Text className="title">剧情介绍</Text>
                <View className="content">
                    <Text>{data && data.profile}</Text>
                </View>
                <View className="btn_box">
                    <Button open-type="share" className="btn share">
                        分享给好友
                        <AtIcon value="share" size="14" color="#FFF"></AtIcon>
                    </Button>
                    <Button
                        className="btn search"
                        onClick={() =>
                            Taro.switchTab({
                                url: `/pages/search/index`
                            })
                        }
                    >
                        搜索更多影片
                        <AtIcon value="search" size="14" color="#FFF"></AtIcon>
                    </Button>
                </View>
            </View>
            {status && status.play_show && (
                <View>
                    <PlayList data={data && data.video_url} gotoPlay={gotoPlay} ids={data && data.id} isJump />
                    <PlayList
                        data={data && data.play_url}
                        style={{ background: '#f7f8fa', color: '#000' }}
                        title="站外播放链接：(点击按钮复制链接去浏览器打开)"
                        copy
                        ids={data && data.id}
                    />
                    <PlayList
                        data={data && data.download_url}
                        style={{ background: '#f7f8fa', color: '#000' }}
                        title="下载链接"
                        copy
                        ids={data && data.id}
                    />
                </View>
            )}

            <View className="avow">
                <Text className="title">免责声明</Text>
                <View className="content">
                    <Text>
                        本站所有资源来源于互联网网友交流，只供网络测试和学习交流所用、所有视频版权归原权利人，任何人不得用以此从事非法盈利或其他违法行为活动。如果有关视频侵犯了你的权益，请联系告知，我们将于第一时间删除，建议所有影视爱好者购买正版音像制品或去电影院观看最新大片。联系邮箱：leeycul@163.com
                    </Text>
                </View>
            </View>
        </View>
    )
}

Details.config = {
    navigationBarTitleText: '...',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
}

export default Details
