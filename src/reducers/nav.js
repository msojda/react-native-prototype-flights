import Navigator from '@flights/app/routing';

const INITIAL_SCREEN = 'Airports';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams(INITIAL_SCREEN));

export default (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  return nextState || state;
};
