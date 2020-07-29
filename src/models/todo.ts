import { list, save } from '@/request/index.ts';

export default {
  state: {
    list: [],
  },
  reducers: {
    delete(state: any, { payload }: any) {
      state.list.splice(payload.index, 1);
      return JSON.parse(JSON.stringify(state));
    },
    add(state: any, { payload }: any) {
      state.list.push(payload.item);
      return JSON.parse(JSON.stringify(state));
    },
    get(state: any, { payload }: any) {
      state.list = payload.list;
      return JSON.parse(JSON.stringify(state));
    },
    edit(state: any, { payload }: any) {
      const { index, item } = payload;
      state.list[index] = item;
      return JSON.parse(JSON.stringify(state));
    },
  },
  effects: {
    *save({ payload }: any, { call }: any) {
      yield call(save, {
        list: payload.list.map(v => {
          return {
            value: v.value,
            todoStatus: v.todoStatus,
          };
        }),
      });
    },
    *list({ payload }: any, { put, call }: any) {
      const data = yield call(list, { payload });
      yield put({
        type: 'get',
        payload: { list: data },
      });
      return data;
    },
  },
};
