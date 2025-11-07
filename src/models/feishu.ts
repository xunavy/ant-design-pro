import type { Effect, Reducer } from 'umi';
import { getFeishuGroups, getHistoryMessages } from '@/services/feishu/api';
import type { FeishuGroup, FeishuMessage } from '@/services/feishu/typings';

export interface FeishuState {
  groups: FeishuGroup[];
  messages: FeishuMessage[];
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  filterParams: {
    keyword?: string;
    startTime?: string;
    endTime?: string;
    messageType?: string;
    matchMode?: 'exact' | 'fuzzy';
  };
}

export interface FeishuModelType {
  namespace: 'feishu';
  state: FeishuState;
  effects: {
    fetchGroups: Effect;
    fetchHistoryMessages: Effect;
    fetchRealtimeMessages: Effect;
  };
  reducers: {
    saveGroups: Reducer<FeishuState>;
    saveMessages: Reducer<FeishuState>;
    updateLoading: Reducer<FeishuState>;
    updateFilterParams: Reducer<FeishuState>;
    updatePagination: Reducer<FeishuState>;
  };
}

const FeishuModel: FeishuModelType = {
  namespace: 'feishu',

  state: {
    groups: [],
    messages: [],
    loading: false,
    total: 0,
    currentPage: 1,
    pageSize: 10,
    filterParams: {},
  },

  effects: {
    *fetchGroups(_, { call, put }) {
      yield put({ type: 'updateLoading', payload: true });
      try {
        const response = yield call(getFeishuGroups);
        yield put({ type: 'saveGroups', payload: response.data || [] });
      } catch (error) {
        console.error('Failed to fetch Feishu groups:', error);
      } finally {
        yield put({ type: 'updateLoading', payload: false });
      }
    },

    *fetchHistoryMessages({ payload }, { call, put, select }) {
      yield put({ type: 'updateLoading', payload: true });
      try {
        const state = yield select((state: any) => state.feishu);
        const params = {
          page: payload?.page || state.currentPage,
          pageSize: payload?.pageSize || state.pageSize,
          ...state.filterParams,
          ...payload?.filterParams,
        };

        const response = yield call(getHistoryMessages, params);
        yield put({ type: 'saveMessages', payload: response });
      } catch (error) {
        console.error('Failed to fetch Feishu history messages:', error);
      } finally {
        yield put({ type: 'updateLoading', payload: false });
      }
    },

    *fetchRealtimeMessages({ payload }, { call, put }) {
      try {
        const response = yield call(getFeishuRealtimeMessages, payload);
        yield put({ type: 'saveMessages', payload: response });
      } catch (error) {
        console.error('Failed to fetch Feishu realtime messages:', error);
      }
    },
  },

  reducers: {
    saveGroups(state, action) {
      return {
        ...state,
        groups: action.payload,
      };
    },

    saveMessages(state, action) {
      return {
        ...state,
        messages: action.payload.data || [],
        total: action.payload.total || 0,
      };
    },

    updateLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    updateFilterParams(state, action) {
      return {
        ...state,
        filterParams: { ...state.filterParams, ...action.payload },
      };
    },

    updatePagination(state, action) {
      return {
        ...state,
        currentPage: action.payload.currentPage || state.currentPage,
        pageSize: action.payload.pageSize || state.pageSize,
      };
    },
  },
};

export default FeishuModel;
