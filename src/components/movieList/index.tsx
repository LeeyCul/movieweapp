import Taro, { memo, FC } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './style.scss'

interface IProps {
    data: any[]
}

const MovieList: FC<IProps> = ({ data }) => {
    function gotoDetails(id) {
        Taro.navigateTo({ url: `/pagesA/details/index?id=${id}` })
    }
    const total = data ? data.length : 0
    const frequency = Math.abs(3 - (total % 3))
    let afterArr = frequency !== 3 && new Array(frequency).fill('1')

    return (
        <View className="movie_list">
            {data &&
                data.map((item: any) => {
                    const { id, clarity, image, name } = item
                    return (
                        <View className="sigle_view" key={id} onClick={() => gotoDetails(id)}>
                            <Image src={image} />
                            <View className="tip">{clarity}</View>
                            <View className="name">{name}</View>
                        </View>
                    )
                })}
            {afterArr &&
                afterArr.map((item, index) => {
                    return <View className="after-View" key={`${item}-${index}`}></View>
                })}
        </View>
    )
}

export default memo(MovieList)
