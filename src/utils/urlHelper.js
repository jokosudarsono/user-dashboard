import _get from 'lodash/get';

export const getUrlSegment = (segment) => {
  const path = window.location.pathname;
  const splitted = path.split('/');

  const result = _get(splitted, `${segment}`) || '';
  return result;
};

export const getUrlSegments = () => {
  const path = window.location.pathname;
  const splitted = path.split('/');
  const results = splitted
    .filter((x) => !!x)
    .reduce((cumm, curr, idx) => {
      let url = idx > 0 ? `/${cumm[idx-1].name}/${curr}` : `/${curr}`
      const result = cumm.concat({ url, name: curr})
      return result
    }, [])
  return results
}
