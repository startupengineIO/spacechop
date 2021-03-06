import Source from './../../source';
import lookThroughSources from './../look-through-sources';

describe('lookThroughSources', () => {
  it('should return null if image does not exist in source', async () => {
    const sources: Source[] = [
      {
        exists: jest.fn(() => Promise.resolve(false)),
        stream: jest.fn(() => Promise.resolve()),
      },
    ];

    const result = await lookThroughSources(sources, {});
    expect(result).toBeNull();
  });
  it('should only check sources until image is found', async () => {
    const sources: Source[] = [
      {
        exists: jest.fn(() => Promise.resolve(true)),
        stream: jest.fn(() => Promise.resolve()),
      },
      {
        exists: jest.fn(() => Promise.resolve(false)),
        stream: jest.fn(() => Promise.resolve()),
      },
    ];

    await lookThroughSources(sources, {});

    expect(sources[0].exists).toHaveBeenCalled();
    expect(sources[1].exists).not.toHaveBeenCalled();
  });

});
