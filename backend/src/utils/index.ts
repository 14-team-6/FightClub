import { recreateDB } from '@backend/src/utils/recreateDB/recreateDB';
import { addDefaultTheme } from '@backend/src/utils/fillDb/addDefaultTheme';

const args = process.argv.slice(2);

const help = () => {
  /* eslint-disable */
  console.log('usage: command arg1 arg2 ... argn');
  console.log('commands are:');
  console.log('    recreate-db');
  console.log('    add-default-theme');
  /* eslint-enable */
};

if (args.length === 0) {
  help();
} else {
  switch (args[0]) {
    case 'recreate-db':
      recreateDB();
      break;
    case 'add-default-theme':
      addDefaultTheme();
      break;
    default:
      help();
  }
}
