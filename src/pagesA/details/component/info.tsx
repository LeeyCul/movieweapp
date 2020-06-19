import Taro, { useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./info.scss";

function Info({ data = {} }: any) {
    const { title, desc_s, desc_l } = data;
    const desc = desc_s && JSON.parse(desc_s);
    const desc_info = desc_l && JSON.parse(desc_l);
    return (
        <View className="info_box">
            <View className="title common">{title || ""}</View>
            {desc_info.length &&
                desc_info.map(item => (
                    <View key={item} className="common">
                        {item}
                    </View>
                ))}
            <View className="other">
                {desc.length &&
                    desc.map(item => <Text key={item}>{item}</Text>)}
            </View>
        </View>
    );
}

export default Info;
