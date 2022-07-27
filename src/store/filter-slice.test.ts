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
  const prevState = state
  const newState = filterSLice.reducer(state, filterActions.toggleFilterStatus('isNew'))
  expect(newState.filter.isNew).toEqual(!prevState.filter.isNew)
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('')
})

test('toggle filter isLimited status', () => {
  const prevState = state
  const newState = filterSLice.reducer(state, filterActions.toggleFilterStatus('isLimited'))
  expect(newState.filter.isLimited).toEqual(!prevState.filter.isLimited)
  expect(newState.filter.isNew).toBeFalsy()
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
  expect(newState.filter.category).not.toContain('test-category')
  expect(newState.filter.search).toEqual('')
})

test('clear filter', () => {
  state = { filter: { isNew: true, isLimited: true, category: ['categoty to delete'], search: 'search to delete' } }
  const newState = filterSLice.reducer(state, filterActions.clearFilter())
  expect(newState.filter.isNew).toBeFalsy()
  expect(newState.filter.isLimited).toBeFalsy()
  expect(newState.filter.category).toHaveLength(0)
  expect(newState.filter.search).toEqual('')
})

export {}
