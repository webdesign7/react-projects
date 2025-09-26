import {Suspense} from "react";
import UsePromiseDemo from "@/app/components/UsePromisesDemo";
import fs from 'node:fs/promises';
import ErrorBoundary from "@/app/components/ErrorBoundary";

export default async function Home() {

    const usersPromice = new Promise((resolve) =>
        setTimeout(async () => {
            const data = await fs.readFile('dummy-db.json', 'utf-8');
            const users = JSON.parse(data);
            //throw new Error('Something went wrong!');
            resolve(users);
        },2000));

  return (
    <main>
        <ErrorBoundary fallback={<p>An error occurred...</p>}>
          <Suspense falllback={<p>Loading...</p>}>
              <UsePromiseDemo usersPromice={usersPromice}></UsePromiseDemo>
          </Suspense>
        </ErrorBoundary>
    </main>
  );
}
