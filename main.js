import { createReadStream, createWriteStream } from 'fs';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';
import { program } from 'commander';

import TransformChoise from './module/choise.js';
import valid from './module/valid.js';

const pipeline = promisify(_pipeline);

const actions = async () => {
  const { input, output, task } = program.opts();

  if (task !== 'reverse' && task !== 'triangle') {
    process.stderr.write(`Task must be "reverse" or "triagnle"\n`);
    process.exit(1);
  }

  if (!input) {
    process.stderr.write(`Input file is required\n`);
    process.exit(1);
  }

  const readStream = createReadStream(input);
  const writeStream = output ? createWriteStream(output, { flags: 'a' }) : process.stdout;

  try {
    await pipeline(
      readStream,
      new TransformChoise(task),
      writeStream
    );
    process.stdout.write(`Task ${task} was done\n`);
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exit(1);
  }
};

program
  .requiredOption('-t, --task <task>', 'An action reverse/triangle')
  .option('-i, --input <filename>', 'An input file')
  .option('-o, --output <filename>', 'An output file')
  .action(actions);

program.parse(process.argv);
