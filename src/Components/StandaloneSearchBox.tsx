import { buildStandaloneSearchBox, StandaloneSearchBoxOptions } from '@coveo/headless';
import { useEffect, useState, FunctionComponent, useContext } from 'react';
import EngineContext from '../common/engineContext';

export const StandaloneSearchBox: FunctionComponent<StandaloneSearchBoxOptions> = (props) => {
  const engine = useContext(EngineContext);
  const controller = buildStandaloneSearchBox(engine!, { options: props });
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  function isEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    return e.key === 'Enter';
  }

  if (!state) {
    return null;
  }
  const {value, analytics} = controller.state
  if (state.redirectTo) {
    const { redirectTo } = state;
    // const data = {value, analytics};
    const data = {value, analytics};
    localStorage.setItem('coveo_standalone_search_box_data', JSON.stringify(data));
    window.location.href = redirectTo;
    return null;
  }

  return (
    <div>
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => isEnterKey(e) && controller.submit()}
      />
      <div onClick={() => controller.submit()}>Click to Search</div>
      <button onClick={() => controller.submit()}>Click to Search</button>
      <ul>
        {state.suggestions.map((suggestion) => {
          const value = suggestion.rawValue;
          return (
            <li key={value} onClick={() => controller.selectSuggestion(value)}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// usage

/**
 * ```tsx
 * <StandaloneSearchBox id="ssb-1" redirectionUrl="/search-page"/>;
 * ```
 */
