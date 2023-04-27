import os from 'node:os';

const data = [os.hostname(), os.platform(), os.release()];

export default data;

