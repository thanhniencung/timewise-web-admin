import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseApi
} from "../network/timewise_api";

export const useProduct = () => {
    const state = reactive({
        cateListData: null,
        cateListStatus: null,
        addCateSuccess: null
    });

    const getCateList = async () => {
        const response = await timewiseApi.get('/cate/list');
        return response.data.data.map((item) => {
            return {
                id: item.cateId,
                value: item.cateName
            }
        });
    };

    return {
        ...toRefs(state),
        getCateList,
    };

}