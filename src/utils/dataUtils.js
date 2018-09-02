import _ from 'lodash';
import Immutable from 'seamless-immutable';

const fromImmutable = (raw) => {
  if (_.has(raw, 'asMutable')) {
    return raw.asMutable({ deep: true });
  }
  return raw;
};
// convert this JS object into an Immutable object
const toImmutable = raw => Immutable(raw);

export const immutablePersistenceTransform = {
  out: (state) => {
    // //console.log({ retrieving: state })
    // --- HACKZORZ ---
    // Attach a empty-ass function to the object called `mergeDeep`.
    // This tricks redux-persist into just placing our Immutable object into the state tree
    // instead of trying to convert it to a POJO
    // https://github.com/rt2zz/redux-persist/blob/master/src/autoRehydrate.js#L55
    //
    // Another equal terrifying option would be to try to pass their other check
    // which is lodash isPlainObject.
    // --- END HACKZORZ ---
    state.mergeDeep = function _identity(x) {
      return x;
    };
    return toImmutable(state);
  },
  in: (raw) => {
    return fromImmutable(raw);
  },
};
