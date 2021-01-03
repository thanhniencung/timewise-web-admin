import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseApi
} from "../network/timewise_api";

export const useCate = () => {
    const state = reactive({
        cateListData: null,
        cateListStatus: null,
        addCateSuccess: null
    });

    const getCateList = async () => {
        const response = await timewiseApi.get('/cate/list');
        if (response.data.data) {
            state.cateListData = response.data.data;
        } else {
            state.cateListStatus = "Bạn chưa có danh mục nào"
        }
    };

    const addCate = async (cate) => {
        const response = await timewiseApi.post('/cate/add', cate);
        state.addCateSuccess = response.status == 200;
    };

    const updateCate = async (cate) => {
        const response = await timewiseApi.put('/cate/edit', cate);
        state.addCateSuccess = response.status == 200;
    };

    return {
        ...toRefs(state),
        getCateList,
        addCate,
        updateCate,
    };

}