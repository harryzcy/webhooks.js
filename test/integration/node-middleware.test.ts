import { describe, beforeAll, afterEach, expect, test, vi } from "vitest";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";

import { sign } from "@octokit/webhooks-methods";

// import without types
// @ts-expect-error
const express = (await import("express")).default;

import { createNodeMiddleware, Webhooks } from "../../src/index.ts";

const pushEventPayload = readFileSync(
  "test/fixtures/push-payload.json",
  "utf-8",
);
let signatureSha256: string;

describe("createNodeMiddleware(webhooks)", () => {
  beforeAll(async () => {
    signatureSha256 = await sign("mySecret", pushEventPayload);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("README example", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    expect(response.status).toEqual(200);
    await expect(response.text()).resolves.toBe("ok\n");

    server.close();
  });

  test("request.body already parsed (e.g. Lambda)", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });
    const dataChunks: any[] = [];
    const middleware = createNodeMiddleware(webhooks);

    const server = createServer((req, res) => {
      req.once("data", (chunk) => dataChunks.push(chunk));
      req.once("end", () => {
        // @ts-expect-error - TS2339: Property 'body' does not exist on type 'IncomingMessage'.
        req.body = Buffer.concat(dataChunks).toString();
        middleware(req, res);
      });
    }).listen();

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    expect(response.status).toEqual(200);
    expect(await response.text()).toEqual("ok\n");

    server.close();
  });

  test("Handles invalid Content-Type", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;
    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toBe(
      '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
    );
    expect(response.status).toEqual(415);

    server.close();
  });

  test("Handles Missing Content-Type", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;
    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toBe(
      '{"error":"Unsupported \\"Content-Type\\" header value. Must be \\"application/json\\""}',
    );
    expect(response.status).toEqual(415);

    server.close();
  });

  test("Handles invalid JSON", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const payload = '{"name":"invalid"';

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": await sign("mySecret", payload),
        },
        body: payload,
      },
    );

    expect(response.status).toEqual(400);

    await expect(response.text()).resolves.toMatch(/SyntaxError: Invalid JSON/);

    server.close();
  });

  test("Handles non POST request", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: "invalid",
      },
    );

    expect(response.status).toEqual(404);

    await expect(response.text()).resolves.toMatch(
      /Unknown route: PUT \/api\/github\/webhooks/,
    );

    server.close();
  });

  test("handle unhandled requests", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const middleware = createNodeMiddleware(webhooks, {});
    const server = createServer(async (req, res) => {
      if (!(await middleware(req, res))) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("nope.");
        res.end();
      }
    }).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://localhost:${port}/foo`, {
      method: "PUT",
      headers: {
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: "invalid",
    });

    expect(response.status).toEqual(404);

    await expect(response.text()).resolves.toEqual("nope.");

    server.close();
  });

  test("Handles missing headers", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          // "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: "invalid",
      },
    );

    expect(response.status).toEqual(400);

    await expect(response.text()).resolves.toMatch(
      /Required headers missing: x-github-event/,
    );

    server.close();
  });

  test("Handles non-request errors", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", () => {
      throw new Error("boom");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toMatch(/Error: boom/);
    expect(response.status).toEqual(500);

    server.close();
  });

  test("Handles empty errors", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", () => {
      throw new Error();
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toMatch(
      /Error: An Unspecified error occurred/,
    );
    expect(response.status).toEqual(500);

    server.close();
  });

  test("Handles timeout", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout"] });

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", async () => {
      vi.advanceTimersByTime(10000);
      server.close();
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toMatch(/still processing/);
    expect(response.status).toEqual(202);
  });

  test("Handles timeout with error", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout"] });

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.on("push", async () => {
      vi.advanceTimersByTime(10000);
      server.close();
      throw new Error("oops");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await expect(response.text()).resolves.toMatch(/still processing/);
    expect(response.status).toEqual(202);
  });

  test("express middleware no mount path 404", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("Dafuq");
    expect(response.status).toEqual(404);

    server.close();
  });

  test("express middleware no mount path no next", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.all("/foo", (_request: any, response: any) => response.end("ok\n"));
    app.use(createNodeMiddleware(webhooks));

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toContain("Cannot POST /test");
    expect(response.status).toEqual(404);

    const responseForFoo = await fetch(`http://localhost:${port}/foo`, {
      method: "POST",
      body: pushEventPayload,
    });

    await expect(responseForFoo.text()).resolves.toContain("ok\n");
    expect(responseForFoo.status).toEqual(200);

    server.close();
  });

  test("express middleware no mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.use(createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("ok\n");
    expect(response.status).toEqual(200);

    server.close();
  });

  test("express middleware with mount path with options.path", async () => {
    const app = express();
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    app.post("/test", createNodeMiddleware(webhooks, { path: "/test" }));
    app.all("*", (_request: any, response: any) =>
      response.status(404).send("Dafuq"),
    );

    const server = app.listen();

    const { port } = server.address();

    const response = await fetch(`http://localhost:${port}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
        "X-GitHub-Event": "push",
        "X-Hub-Signature-256": signatureSha256,
      },
      body: pushEventPayload,
    });

    await expect(response.text()).resolves.toBe("ok\n");
    expect(response.status).toEqual(200);

    server.close();
  });

  test("Handles invalid URL", async () => {
    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    let middlewareWasRan: () => void;
    const untilMiddlewareIsRan = new Promise<void>(function (resolve) {
      middlewareWasRan = resolve;
    });
    const actualMiddleware = createNodeMiddleware(webhooks);
    const mockedMiddleware = async function (
      ...[req, ...rest]: Parameters<typeof actualMiddleware>
    ) {
      req.url = "//";
      await actualMiddleware(req, ...rest);
      middlewareWasRan();
    };
    const server = createServer(mockedMiddleware).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256,
        },
        body: pushEventPayload,
      },
    );

    await untilMiddlewareIsRan;
    expect(response.status).toEqual(422);
    expect(await response.text()).toMatch(/Request URL could not be parsed/);

    server.close();
  });

  test("Handles invalid signature", async () => {
    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
    });

    webhooks.onError((error) => {
      expect(error.message).toContain(
        "signature does not match event payload and secret",
      );
    });

    const log = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const middleware = createNodeMiddleware(webhooks, { log });
    const server = createServer(middleware).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "1",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": "",
        },
        body: pushEventPayload,
      },
    );

    expect(response.status).toEqual(400);
    await expect(response.text()).resolves.toBe(
      '{"error":"Error: [@octokit/webhooks] signature does not match event payload and secret"}',
    );

    server.close();
  });

  test("Additional secrets", async () => {
    const signatureSha256AdditionalSecret = await sign(
      "additionalSecret2",
      pushEventPayload,
    );

    expect.assertions(3);

    const webhooks = new Webhooks({
      secret: "mySecret",
      additionalSecrets: ["additionalSecret1", "additionalSecret2"],
    });

    webhooks.on("push", (event) => {
      expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
    });

    const server = createServer(createNodeMiddleware(webhooks)).listen();

    const { port } = server.address() as AddressInfo;

    const response = await fetch(
      `http://localhost:${port}/api/github/webhooks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
          "X-GitHub-Event": "push",
          "X-Hub-Signature-256": signatureSha256AdditionalSecret,
        },
        body: pushEventPayload,
      },
    );

    expect(response.status).toEqual(200);
    await expect(response.text()).resolves.toBe("ok\n");

    server.close();
  });
});

test("request.body is already an Object and has request.rawBody as Buffer (e.g. GCF)", async () => {
  expect.assertions(3);

  const webhooks = new Webhooks({
    secret: "mySecret",
  });
  const dataChunks: any[] = [];
  const middleware = createNodeMiddleware(webhooks);

  const server = createServer((req, res) => {
    req.once("data", (chunk) => dataChunks.push(chunk));
    req.once("end", () => {
      // @ts-expect-error - TS2339: Property 'rawBody' does not exist on type 'IncomingMessage'.
      req.rawBody = Buffer.concat(dataChunks);
      // @ts-expect-error - TS2339: Property 'body' does not exist on type 'IncomingMessage'.
      req.body = JSON.parse(req.rawBody);
      middleware(req, res);
    });
  }).listen();

  webhooks.on("push", (event) => {
    expect(event.id).toBe("123e4567-e89b-12d3-a456-426655440000");
  });

  const { port } = server.address() as AddressInfo;

  const response = await fetch(`http://localhost:${port}/api/github/webhooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Delivery": "123e4567-e89b-12d3-a456-426655440000",
      "X-GitHub-Event": "push",
      "X-Hub-Signature-256": signatureSha256,
    },
    body: pushEventPayload,
  });

  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual("ok\n");

  server.close();
});
