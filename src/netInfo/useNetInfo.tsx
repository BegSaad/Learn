import { useEffect, useState } from 'react'

import NetInfo from '@react-native-community/netinfo'

const useNetInfo = () => {
    const [netInfo, setNetInfo] = useState(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: any) => {
            setNetInfo(state?.isConnected)
        })
        return () => unsubscribe()
    }, [])

    return netInfo
}

export default useNetInfo