import Taro from '@tarojs/taro'

// api请求封装
let _loading = false
const htttRequest = function(url: string, paramet: object, method: any) {
    // 获取token
    // const token = Taro.getStorageSync('Info')

    if (!_loading) {
        Taro.showLoading({
            title: '加载中'
        })
        _loading = true
    }

    return new Promise<{}>((resolve, reject) => {
        Taro.request({
            url,
            data: paramet,
            method: method,
            header: {
                'content-type': 'application/json'
                // Authorization: token.accessToken ? token.accessToken : ''
            }
        })
            .then(res => {
                if (_loading) {
                    Taro.hideLoading()
                    _loading = false
                }

                switch (res.statusCode) {
                    case 200:
                        return resolve(res.data)

                    case 10014:
                        // token校验失败
                        Taro.navigateTo({
                            url: '/pages/login/index'
                        })
                        // Taro.clearStorageSync()
                        return reject(res.data)

                    case 10002:
                        // 缺少商户信息
                        Taro.navigateTo({
                            url: '/pages/login/index'
                        })
                        return reject(res.data)

                    default:
                        setTimeout(() => {
                            Taro.showToast({
                                title: res.data.msg || '当前网络不佳，请稍后尝试',
                                icon: 'none'
                            })
                        }, 500)
                }
            })
            .catch(err => {
                Taro.showToast({
                    title: '当前网络不佳，请稍后尝试',
                    icon: 'none'
                })

                return reject(err)
            })
    })
}

export default htttRequest
