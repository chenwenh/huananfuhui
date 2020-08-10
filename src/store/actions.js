
import axios from '@/assets/js/http'
import { appConst } from '@/assets/js/appConst'

// 获取pattern-node-types/get 业务图type
export const GET_PATTERN_NODE_TYPES = function ({ commit, state }, data) {
    let url = `/pattern-node-types/get`
    axios.get(url, {}).then(response => {
        console.log(response.data)
        if (response.data.status === appConst.status) {
            commit(types.GET_PATTERN_NODE_TYPES, response.data.data)
        }
    })
}