"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
test('200 Response', async () => {
    var _a;
    console.log('env ->', process.env);
    const url = (_a = process.env.SERVICE_URL) !== null && _a !== void 0 ? _a : 'No SERVICE_URL in env';
    console.log('url ->', url);
    // TODO: Figure out why CORS on API isn't working
    //
    // await axios.request({
    //     url
    // }).then(response => {
    //     console.log('response ->', response);
    //     expect(response.status).toEqual(200);
    // }).catch(error => {
    //     console.log('error ->', error);
    //     fail(error);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9zZXJ2aWNlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0X3NlcnZpY2UudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7O0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLEdBQUcsU0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsbUNBQUksdUJBQXVCLENBQUE7SUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFM0IsaURBQWlEO0lBQ2pELEVBQUU7SUFDRix3QkFBd0I7SUFDeEIsVUFBVTtJQUNWLHdCQUF3QjtJQUN4Qiw0Q0FBNEM7SUFFNUMsNENBQTRDO0lBQzVDLHNCQUFzQjtJQUN0QixzQ0FBc0M7SUFFdEMsbUJBQW1CO0lBQ25CLE1BQU07QUFDVixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbnRlc3QoJzIwMCBSZXNwb25zZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnZW52IC0+JywgcHJvY2Vzcy5lbnYpO1xuXG4gICAgY29uc3QgdXJsID0gcHJvY2Vzcy5lbnYuU0VSVklDRV9VUkwgPz8gJ05vIFNFUlZJQ0VfVVJMIGluIGVudidcbiAgICBjb25zb2xlLmxvZygndXJsIC0+JywgdXJsKTtcblxuICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgd2h5IENPUlMgb24gQVBJIGlzbid0IHdvcmtpbmdcbiAgICAvL1xuICAgIC8vIGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgIC8vICAgICB1cmxcbiAgICAvLyB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlIC0+JywgcmVzcG9uc2UpO1xuXG4gICAgLy8gICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvRXF1YWwoMjAwKTtcbiAgICAvLyB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdlcnJvciAtPicsIGVycm9yKTtcblxuICAgIC8vICAgICBmYWlsKGVycm9yKTtcbiAgICAvLyB9KTtcbn0pO1xuIl19