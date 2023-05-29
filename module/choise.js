import { Transform } from 'stream';

import { reverseWords } from './reverse.js';
import { getOddTriangleRow } from './triangle.js';

class TransformChoise extends Transform {
  constructor(action) {
    super();
    this.action = action;
  }

  _transform(chunk, _, done) {
    let result = '';

    switch (this.action) {
      case 'reverse':
        result = reverseWords(chunk.toString('utf8'));
        break;
      case 'triangle':
        result = getOddTriangleRow(chunk.toString('utf8'));
        break;
      default:
        process.stderr.write(' Error: Task not found\n');
        process.exit(1);
    }

    this.push(result);
    done();
  }
}

export default TransformChoise;