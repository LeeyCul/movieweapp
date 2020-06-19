import Taro, { useState, memo, useCallback } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtToast } from 'taro-ui'
import PropTypes from 'prop-types'

interface IProps {
    isJump?: boolean
    onClick?: (value: string) => void
}

function SearchPut({ isJump = false, onClick }: IProps) {
    const [value, setValue] = useState<string>('')

    const changeText = useCallback(
        (value: string) => {
            setValue(value)
        },
        [value]
    )

    function changeFocus() {
        isJump &&
            Taro.switchTab({
                url: '/pages/search/index',
            })
    }

    return (
        <View className="search_box">
            <AtSearchBar
                value={value}
                onChange={changeText}
                onFocus={changeFocus}
                placeholder="搜索关键字"
                fixed={true}
                showActionButton={isJump}
                onClear={e => {
                    setValue('')
                    onClick && onClick('')
                }}
                onActionClick={() => onClick && onClick(value)}
                onConfirm={() => onClick && onClick(value)}
            />
        </View>
    )
}

export default memo(SearchPut)

SearchPut.propTypes = {
    isJump: PropTypes.bool,
    onClick: PropTypes.func,
}
