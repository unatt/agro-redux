import filterSLice, { filterActions, InitialFilterState } from './filter-slice'

let state: InitialFilterState

beforeEach(() => {
  state = { filter: { isNew: false, isLimited: false, category: [], search: '' } }
})
test('change search filter', () => {
  const newState = filterSLice.reducer(state, filterActions.changeFilterSearch('searchString'))
  expect(newState.filter.isNew).toBeFalsy()
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('searchString')
})

test('toggle filter isNew status', () => {
  const newState = filterSLice.reducer(state, filterActions.toggleFilterStatus('isNew'))
  expect(newState.filter.isNew).toBeTruthy()
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('')
})

test('toggle filter isLimited status', () => {
  const newState = filterSLice.reducer(state, filterActions.toggleFilterStatus('isLimited'))
  expect(newState.filter.isNew).toBeFalsy()
  expect(newState.filter.isLimited).toBeTruthy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('')
})

test('add filter category', () => {
  const newState = filterSLice.reducer(state, filterActions.changeFilterCategory('test-category'))
  expect(newState.filter.isNew).toBeFalsy()
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toContain('test-category')
  expect(newState.filter.search).toEqual('')
})

test('remove filter category', () => {
  state = { filter: { isNew: false, isLimited: false, category: ['test-category'], search: '' } }
  const newState = filterSLice.reducer(state, filterActions.changeFilterCategory('test-category'))
  expect(newState.filter.isNew).toBeFalsy()
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('')
})

export {}
