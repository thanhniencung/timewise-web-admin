import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseApi
} from "../network/timewise_api";

export const useProduct = () => {
    const state = reactive({
        addProductSuccess: null
    });

    const getCateList = async () => {
        const response = await timewiseApi.get('/cate/list');
        if (!response.data.data) {
            return [];
        }
        return response.data.data.map((item) => {
            return {
                id: item.cateId,
                value: item.cateName
            }
        });
    };

    const addProduct = async (product) => {
        const response = await timewiseApi.post('/product/add', product);
        state.addProductSuccess = response.status == 200;
    };

    const getProductList = async () => {
        const response = await timewiseApi.get('/product/list');
        return response.data.data;
    };

    return {
        ...toRefs(state),
        getCateList,
        addProduct,
        getProductList,
    };

}