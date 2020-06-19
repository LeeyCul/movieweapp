import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './listView.scss'

import api from '../../../service'

interface IProps {
    data: any[]
}

function ListView({ data = [] }: IProps) {
    async function handleClick(name) {
        let res: any = await api.getByName({ name })
        const { data, code } = res
        const { id } = data
        if (code === 200) {
            Taro.navigateTo({ url: `/pagesA/details/index?id=${id}` })
        }
    }
    return (
        <View className="list_view_box">
            {data.length &&
                data.map(item => {
                    const { imgv_url, title, type, show_actor } = item
                    return (
                        <View className="item_box" onClick={() => handleClick(title)}>
                            <Image src={imgv_url} />
                            <View className="content">
                                <Text className="title">{title}</Text>
                                <Text>主演：{show_actor && show_actor[0].name}</Text>
                                <Text>类型：{type && type[0].name}</Text>
                            </View>
                        </View>
                    )
                })}
        </View>
    )
}

export default ListView
