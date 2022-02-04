import FunkyCSV from '../src';

class Link {
  setAttribute(attribute, value) {
    this[attribute] = value;
  }
  click() {
    return true;
  }
}

const document = {
  createElement(name) {
    return new Link(name);
  },
  body: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  },
};

function createLink(url) {
    const link = document.createElement('a');
    link.href = url;
    return link;
  }

describe('frontend handlers', () => {
  it('should download csv', () => {
    global.document = document;
    jest.spyOn(document, 'createElement');
    const funkyCSV = new FunkyCSV();
    funkyCSV.setHeader(['Column 1', 'Column 2']);
    funkyCSV.setContent([
        {
            val1: 'Value Column 1',
            val2: 'Value Column 2',
        },
    ]);
    funkyCSV.download();
    expect(document.createElement).toBeCalledWith('a');
  });
});
