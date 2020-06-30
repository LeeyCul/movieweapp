import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import classNames from 'classnames'
import { useSelector, useDispatch } from '@tarojs/redux'

import './playlist.scss'

import { actions } from '../../../store/actions'

interface IProps {
    style?: React.CSSProperties
    title?: string
    data: string
    copy?: boolean
    gotoPlay?: () => void
    ids?: any
    isJump?: boolean
    appId?: string[]
}

function PlayList({ ids, appId = [], style, title = '点击播放', data, copy = false, isJump = false, gotoPlay }: IProps) {
    const dataArr = data && JSON.parse(data)
    const { anthology } = useSelector((state: any) => state.counter)
    const dispatch = useDispatch()

    function handleClick(url: string, key: number) {
        if (copy) {
            Taro.setClipboardData({ data: url })
        } else {
            dispatch(actions.setAnthology(key))
            dispatch(actions.setPlayUrl(url))
            // gotoPlay && gotoPlay();
            if (isJump) {
                const myAppId = 'wxde754dca42bb4f96'
                const appIdList = appId.length && appId.filter(item => item !== myAppId)
                const result = appIdList ? appIdList[Math.floor(Math.random() * appIdList.length)] : ''
                Taro.navigateToMiniProgram({
                    appId: result,
                    path: 'pagesA/play/index',
                    extraData: {
                        id: ids,
                        url,
                        key
                    },
                    envVersion: 'release',
                    success: function(res) {
                        console.log('res :>> ', res)
                        // 打开成功
                    }
                })
            }
        }
    }
    return (
        <View className="palylist_box">
            <Text className="title">{title}</Text>
            <View className="list">
                {dataArr &&
                    dataArr.map((item, key) => {
                        return (
                            <Button
                                key={key + ''}
                                className={classNames('btn', {
                                    active: key === anthology
                                })}
                                style={style}
                                onClick={() => handleClick(item.url, key)}
                            >
                                {item.name}
                            </Button>
                        )
                    })}
            </View>
        </View>
    )
}

export default PlayList
