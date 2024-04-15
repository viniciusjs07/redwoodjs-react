import { render, screen } from '@redwoodjs/testing';

import { Loading, Empty, Failure, Success } from './ArticlesCell';
import { standard } from './ArticlesCell.mock';

describe('ArticlesCell', () => {
  test('Loading renders successfully', () => {
    expect(() => {
      render(<Loading />);
    }).not.toThrow();
  });

  test('Empty renders successfully', async () => {
    expect(() => {
      render(<Empty />);
    }).not.toThrow();
  });

  test('Failure renders successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />);
    }).not.toThrow();
  });

  test('Success renders successfully', async () => {
    const articles = standard().articles;
    render(<Success articles={articles} />);

    expect(screen.getByText(articles[0].title)).toBeInTheDocument();
    expect(screen.getByText(articles[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Str...'
      )
    ).toBeInTheDocument();
  });
});
