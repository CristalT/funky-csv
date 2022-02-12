import { toCamelCase } from '../src/helpers';

it('should convert sentence to camelCase', () => {
  expect(toCamelCase('my ordinary sentence')).toBe('myOrdinarySentence');
})