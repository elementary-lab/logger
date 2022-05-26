// import * as stackTraceParser from 'stacktrace-parser';
// import { SentryTarget } from 'src/Targets/SentryTarget';
// import { LogLevel } from 'src/Types';
// import { expect } from 'chai';
// import { SentryTraceableTransport } from 'test/Helpers/SentryTraceableTransport';

// describe('targets -> SentryTarget', () => {
//     let target: SentryTarget;
//     beforeEach(() => {
//         target = new SentryTarget({
//             exportInterval: 1,
//             enabled: true,
//             dsn: 'https://public:secret@example.com/1',
//             environment: 'tests',
//             release: '0.0.0',
//             levels: [LogLevel.EMERGENCY],
//             transport: SentryTraceableTransport
//         });
//     });
//     it('flush', async () => { // the single test
//         await target.collect([
//             {
//                 category: 'all',
//                 data: {},
//                 level: LogLevel.EMERGENCY,
//                 memoryUsage: 100,
//                 message: 'foo',
//                 time: new Date(),
//                 trace: stackTraceParser.parse(new Error().stack ?? ''),
//             },
//             {
//                 category: 'all',
//                 data: {},
//                 level: LogLevel.EMERGENCY,
//                 memoryUsage: 100,
//                 message: 'foo2',
//                 time: new Date(),
//                 trace: stackTraceParser.parse(new Error().stack ?? ''),
//             },
//         ]);
//         expect('result').to.deep.eq('[undefined]');
//     });
//
//
// });
