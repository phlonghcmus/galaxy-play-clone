import { useReducer } from 'react';
import reducer, { initState, StoreContext } from './store';
function ProviderFiltersContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}
export default ProviderFiltersContext;
