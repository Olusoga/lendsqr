import { Dockest, logLevel } from 'dockest';
import jest from 'jest';

const { run } = new Dockest({
    composeFile: ['docker-compose.test.yml'],
    dumpErrors: true,
    jestLib: jest,
    jestOpts: {
        modulePathIgnorePatterns: ['unit']
    },
    logLevel: logLevel.DEBUG
});

run([
    {
        serviceName: 'mongodb-test'
    }
]);
