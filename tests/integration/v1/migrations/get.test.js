test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const respponseBody = await response.json();

  expect(Array.isArray(respponseBody)).toBe(true);

});
