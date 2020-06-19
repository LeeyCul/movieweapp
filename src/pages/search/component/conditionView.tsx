import { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classnames from "classnames";

import "./style.scss";

interface IProps {
    data: any[] | undefined;
    title: string;
    getValue: (value: string) => void;
}

function ConitionView({ data, title, getValue }: IProps) {
    const [currentKey, setCurrentKey] = useState(0);

    function handleClick(key: number, value) {
        setCurrentKey(key);
        getValue(value);
    }
    return (
        <View className="item_view">
            <Text className="title">{title}：</Text>
            <View className="item_box scrollbar">
                {data &&
                    data.map((item, key) => {
                        return (
                            <Text
                                key={item}
                                onClick={() => handleClick(key, item)}
                                className={classnames("item", {
                                    active: currentKey === key
                                })}
                            >
                                {item}
                            </Text>
                        );
                    })}
            </View>
        </View>
    );
}

export default ConitionView;
