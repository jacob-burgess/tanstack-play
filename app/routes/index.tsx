// app/routes/index.tsx
import * as fs from "fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const filePath = "count.txt";

async function readCount() {
  return Math.floor(Math.random() * 100);
}

const getCount = createServerFn("GET", () => {
  return readCount();
});

const updateCount = createServerFn("POST", async (addBy: number) => {
  const count = await readCount();
  // await fs.promises.writeFile(filePath, `${count + addBy}`);
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <button
        onClick={() => {
          updateCount(1).then(() => {
            router.invalidate();
          });
        }}
      >
        get new random? {state}
      </button>
    </div>
  );
}
