// import * as stackTraceParser from 'stacktrace-parser';
// import { LogLevel } from 'src/Types';
// import { ConsoleTarget } from 'src/Targets/ConsoleTarget';
// import { ConsoleTraceable } from 'test/Helpers/ConsoleTraceable';
//
// const console: ConsoleTraceable = new ConsoleTraceable();
// const target = new ConsoleTarget({
//     exportInterval: 1,
//     enabled: true,
//     levels: [LogLevel.EMERGENCY],
//     consoleClass: console
// });
// test('Targets -> ConsoleTarget', async() => {
//     await target.collect([
//         {
//             category: 'all',
//             data: {},
//             level: LogLevel.EMERGENCY,
//             memoryUsage: 100,
//             message: 'foo',
//             time: new Date('Wed, 09 Aug 1995 00:00:00 GMT'),
//             trace: stackTraceParser.parse(new Error().stack ?? '')
//         },
//         {
//             category: 'all',
//             data: {},
//             level: LogLevel.EMERGENCY,
//             memoryUsage: 100,
//             message: 'foo2',
//             time: new Date('Wed, 09 Aug 1995 00:00:01 GMT'),
//             trace: stackTraceParser.parse(new Error().stack ?? '')
//         }
//     ]);
//     // @ts-ignore
//     // expect(console.getEvents()).toStrictEqual([
//     //     {
//     //         data: {
//     //             message: '[1995-08-09 00:00:00.000][emergency][all] foo [{}]',
//     //             optionalParams: []
//     //         },
//     //         eventType: 'error'
//     //     },
//     //     {
//     //         data: {
//     //             message: '[1995-08-09 00:00:01.000][emergency][all] foo2 [{}]',
//     //             optionalParams: []
//     //         },
//     //         eventType: 'error'
//     //     }
//     // ]);
// });
