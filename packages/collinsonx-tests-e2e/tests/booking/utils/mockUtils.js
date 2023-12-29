// the response of 'GetAvailableSlots' is overrided by mock
export const slotsGQLResponse = {
  getAvailableSlots: {
    slots: [
      {
        endDate: '2024-01-22T13:00:00.000',
        maxDuration: 15,
        startDate: '2024-01-22T12:45:00.000',
      },
      {
        endDate: '2024-01-22T13:15:00.000',
        maxDuration: 15,
        startDate: '2024-01-22T13:00:00.000',
      },
    ],
  },
};

export async function interceptGQLOperation(
  page,
  operationName,
  responseOverride,
  routeToAPI
) {
  await page.route(routeToAPI, (route) => {
    const body = route.request().postDataJSON();

    if (body.operationName !== operationName) {
      return route.fallback();
    }

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: responseOverride }),
    });
  });
}
