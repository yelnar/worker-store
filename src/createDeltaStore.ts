type TReducer<TState, TReducerAction> = (
  state: TState,
  action: TReducerAction
) => TState

type TStore<TState, TReducerAction> = {
  state: TState
  reducer: TReducer<TState, TReducerAction>
  subscribers: ((curState: TState, prevState?: TState) => () => void)[]
}

export function createStore<TState, TReducerAction>(
  initialState: TState,
  reducer: TReducer<TState, TReducerAction>
): {
  state: TState
  dispatch: (action: TReducerAction) => void
  subscribe: (fn: (curState: TState, prevState?: TState) => any) => void
} {
  const store: TStore<TState, TReducerAction> = {
    state: initialState,
    reducer: reducer,
    subscribers: [],
  }

  function subscribe(
    fn: (curState: TState, prevState?: TState) => any
  ): () => void {
    store.subscribers = [...store.subscribers, fn]
    fn(store.state)
    return () => {
      store.subscribers = store.subscribers.filter(sub => sub !== fn)
    }
  }

  function dispatch(action: TReducerAction): void {
    const prevState = store.state
    const curState = store.reducer(store.state, action)
    store.subscribers.forEach(fn => fn(curState, prevState))
  }

  return {
    get state() {
      return store.state
    },
    dispatch,
    subscribe,
  }
}
