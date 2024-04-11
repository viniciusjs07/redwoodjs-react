import { render } from '@redwoodjs/testing/web'

import Widget from './Widget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Widget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Widget />)
    }).not.toThrow()
  })
})
