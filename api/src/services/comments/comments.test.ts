import { comments, createComment } from './comments';
import type { PostOnlyScenario, StandardScenario } from './comments.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments', async (scenario: StandardScenario) => {
    const result = await comments();

    expect(result.length).toEqual(Object.keys(scenario.comment).length);
  });

  scenario(
    'postOnly',
    'creates a new comment',
    async (scenario: PostOnlyScenario) => {
      const comment = await createComment({
        input: {
          name: 'Billy Bob',
          body: 'What is your favorite tree bark?',
          post: {
            connect: { id: scenario.post.bark.id },
          },
        },
      });

      expect(comment.name).toEqual('Billy Bob');
      expect(comment.body).toEqual('What is your favorite tree bark?');
      expect(comment.postId).toEqual(scenario.post.bark.id);
      expect(comment.createdAt).not.toEqual(null);
    }
  );
});
